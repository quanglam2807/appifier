import {
  localAppSet,
  localAppRemove,
} from './action-creators';
import { openSnackbar } from '../snackbar/actions';
import { apiGet } from '../../api';
import installAppAsync from '../../../utils/install-app-async';


export const setLocalApp = (id, status, app) =>
  dispatch => dispatch(localAppSet(id, status, app));

export const removeLocalApp = id =>
  dispatch => dispatch(localAppRemove(id));

export const installApp = (id, name) =>
  dispatch =>
    dispatch(apiGet(`/apps/${id}?action=install`))
      .then(res => res.json())
      .then(({ app }) => installAppAsync(app))
      .catch((err) => {
        dispatch(openSnackbar(`We're sorry. WebCatalog has failed to install ${name}.`));
        // eslint-disable-next-line
        console.log(err);
      });
