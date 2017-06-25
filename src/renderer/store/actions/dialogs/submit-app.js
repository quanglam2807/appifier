import {
  DIALOG_SUBMIT_APP_CLOSE,
  DIALOG_SUBMIT_APP_OPEN,
  DIALOG_SUBMIT_APP_UPDATE,
} from '../../constants/actions';

export const close = () =>
  (dispatch) => {
    dispatch({ type: DIALOG_SUBMIT_APP_CLOSE });
  };

export const open = () =>
  (dispatch) => {
    dispatch({ type: DIALOG_SUBMIT_APP_OPEN });
  };

export const update = changes =>
  (dispatch) => {
    dispatch({
      type: DIALOG_SUBMIT_APP_UPDATE,
      changes,
    });
  };
