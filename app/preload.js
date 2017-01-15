/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* global window */

const { ipcRenderer, webFrame, remote } = require('electron');
const searchInPage = require('electron-in-page-search').default;


ipcRenderer.on('change-zoom', (event, message) => {
  webFrame.setZoomFactor(message);
});

/**
 * Patches window.Notification to set a callback on a new Notification
 * @param callback
 */
const setNotificationCallback = (callback) => {
  const OldNotify = window.Notification;
  const newNotify = (title, opt) => {
    callback(title, opt);
    return new OldNotify(title, opt);
  };
  newNotify.requestPermission = OldNotify.requestPermission.bind(OldNotify);
  Object.defineProperty(newNotify, 'permission', {
    get: () => OldNotify.permission,
  });

  window.Notification = newNotify;
};

setNotificationCallback((title, opt) => {
  ipcRenderer.send('notification', title, opt);
});

// find in Page
const _setImmediate = setImmediate;
process.once('loaded', () => {
  global.setImmediate = _setImmediate;

  const inPageSearch = searchInPage(remote.getCurrentWebContents());
  ipcRenderer.on('openSearchWindow', () => {
    inPageSearch.openSearchWindow();
  });
});
