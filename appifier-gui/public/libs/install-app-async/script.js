const { https } = require('follow-redirects');
const argv = require('yargs-parser')(process.argv.slice(1));
const appifier = require('appifier');
const fs = require('fs-extra');
const isUrl = require('is-url');
const path = require('path');

const {
  allAppPath,
  homePath,
  icon,
  id,
  moleculeVersion,
  name,
  shareResources,
  tempPath,
  url,
} = argv;

const iconDirPath = path.join(homePath, '.webcatalog', 'icons');

const downloadFileTempAsync = (filePath) => {
  const iconFileName = `webcatalog-${id}.png`;
  const iconPath = path.join(tempPath, iconFileName);

  if (isUrl(filePath)) {
    return new Promise((resolve, reject) => {
      const iconFile = fs.createWriteStream(iconPath);

      const req = https.get(filePath, (response) => {
        response.pipe(iconFile);

        iconFile.on('error', (err) => {
          reject(err);
        });

        iconFile.on('finish', () => {
          resolve(iconPath);
        });
      });

      req.on('error', (err) => {
        reject(err);
      });
    });
  }

  return fs.copy(filePath, iconPath)
    .then(() => iconPath);
};

const moveCommonResourcesAsync = (destPath) => {
  if (process.platform === 'win32' || shareResources !== 'true') return Promise.resolve();

  let symlinks;
  switch (process.platform) {
    case 'darwin': {
      symlinks = [
        path.join('Contents', 'Resources', 'app.asar'), // 299.1 MB
        path.join('Contents', 'Resources', 'app.asar.unpacked', 'node_modules'), // 25.6 MB
        path.join('Contents', 'Frameworks', 'Electron Framework.framework'), // 118 MB
      ];
      break;
    }
    case 'linux': {
      symlinks = [
        path.join('resources', 'app.asar'), // 172 MB
        path.join('resources', 'app.asar.unpacked', 'node_modules'), // 7.2 MB
        'content_shell.pak', // 12.0 MB
        'libnode.so', // 21.1 MB
        'icudtl.dat', // 10.MB
        'libffmpeg.so', // 3.0 MB
        'snapshot_blob.bin', // 1.4 MB
      ];
      break;
    }
    default:
      symlinks = [];
  }

  const versionPath = path.join(homePath, '.webcatalog', 'versions', moleculeVersion);

  const p = symlinks.map((l) => {
    const origin = path.join(destPath, l);
    const dest = path.join(versionPath, l);

    return fs.pathExists(dest)
      .then((exists) => {
        if (exists) return fs.remove(origin);
        return fs.move(origin, dest, { overwrite: true });
      })
      .then(() => fs.ensureSymlink(dest, origin));
  });

  return Promise.all(p);
};

downloadFileTempAsync(icon)
  .then(iconPath =>
    appifier.createAppAsync(
      id,
      name,
      url,
      iconPath,
      tempPath,
    )
      .then((appPath) => {
        const originPath = (process.platform === 'darwin') ?
          path.join(appPath, `${name}.app`) : appPath;

        const originPathParsedObj = path.parse(originPath);

        const destPath = path.join(
          allAppPath,
          `${originPathParsedObj.name}${originPathParsedObj.ext}`,
        );

        return fs.move(originPath, destPath)
          .then(() => destPath);
      })
      .then(destPath =>
        moveCommonResourcesAsync(destPath)
          .then(() => fs.copy(iconPath, path.join(iconDirPath, `${id}.png`)))
          .then(() => {
            if (process.platform === 'linux') {
              const execPath = path.join(destPath, name);
              const desktopFilePath = path.join(homePath, '.local', 'share', 'applications', `webcatalog-${id}.desktop`);
              const desktopFileContent = `[Desktop Entry]
            Name=${name}
            Exec="${execPath}"
            Icon=${path.join(iconDirPath, `${id}.png`)}
            Type=Application`;

              return fs.outputFile(desktopFilePath, desktopFileContent);
            }

            return null;
          }))
      .then(() => {
        process.exit(0);
      }))
  .catch((e) => {
    process.send(JSON.stringify({
      message: e.message,
      stack: e.stack,
    }));
    process.exit(1);
  });

process.on('uncaughtException', (e) => {
  process.send(JSON.stringify({
    message: e.message,
    stack: e.stack,
  }));
  process.exit(1);
});
