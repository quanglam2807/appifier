/* global ipcRenderer */
import { INSTALLED } from '../constants/app-statuses';
import {
  requestUninstallApp,
} from '../senders/local';

const uninstallAppAsync = (id, name) =>
  new Promise((resolve, reject) => {
    try {
      const listener = (e, receivedId, receivedStatus) => {
        if (id === receivedId) {
          if (receivedStatus === null) {
            resolve();
            ipcRenderer.removeListener('set-local-app', listener);
          }

          if (receivedStatus === INSTALLED) {
            reject(new Error('Uninstalling failed.'));
            ipcRenderer.removeListener('set-local-app', listener);
          }
        }
      };

      ipcRenderer.on('set-local-app', listener);

      requestUninstallApp(id, name);
    } catch (err) {
      reject(err);
    }
  });

export default uninstallAppAsync;
