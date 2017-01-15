const builder = require('electron-builder');

const { Platform, Arch } = builder;

/* eslint-disable no-console */

// Promise is returned
builder.build({
  targets: Platform.WINDOWS.createTarget(['squirrel', 'nsis'], Arch.x64),
  devMetadata: {
    build: {
      appId: 'com.webcatalog.app',
      win: {
        publish: ['github'],
      },
      files: ['!plugins/darwin/**/*', '!plugins/linux/**/*'],
      asar: true,
      asarUnpack: ['plugins/**'],
    },
  },
})
.then(() => {
  console.log('build successful');
})
.catch(console.log);
