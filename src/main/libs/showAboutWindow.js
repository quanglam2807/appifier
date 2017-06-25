// https://raw.githubusercontent.com/jiahaog/nativefier/development/app/src/components/menu/menu.js
const path = require('path');
const openAboutWindow = require('about-window').default;

const showAboutWindow = () => {
  openAboutWindow({
    icon_path: path.join(__dirname, '..', 'www', 'images', 'icon.1024x1024.png'),
    copyright: `Copyright © 2016 - ${new Date().getFullYear()} WebCatalog Team`,
    win_options: {
      minWidth: 400,
      minHeight: 400,
      maxWidth: 400,
      maxHeight: 400,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
    },
  });
};

module.exports = showAboutWindow;
