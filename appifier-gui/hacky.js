/* eslint-disable no-console */

// Modify the code hackily :(
const path = require('path');
const replace = require('replace-in-file');

// electron-builder
// Keep electron-packager
replace({
  files: path.join(__dirname, 'node_modules', 'electron-builder-lib', 'out', 'util', 'packageDependencies.js'),
  from: '"electron-builder-tslint-config", "electron-download", "electron-forge", "electron-packager", "electron-compilers", "jest", "jest-cli", "prebuild-install", "nan", "electron-webpack", "electron-webpack-ts", "electron-webpack-vue", "react-scripts"',
  to: '"electron-builder-tslint-config", "electron-forge", "electron-compilers", "jest", "jest-cli", "prebuild-install", "nan", "electron-webpack", "electron-webpack-ts", "electron-webpack-vue", "react-scripts"',
})
  .then((changedFiles) => {
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
