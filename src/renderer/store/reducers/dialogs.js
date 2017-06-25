import { combineReducers } from 'redux';

import {
  DIALOG_SUBMIT_APP_CLOSE,
  DIALOG_SUBMIT_APP_OPEN,
  DIALOG_SUBMIT_APP_UPDATE,
} from '../constants/actions';

// Submit App Dialog
const initialForm = {
  Name: null,
  Url: null,
};
const form = (state = initialForm, action) => {
  switch (action.type) {
    case DIALOG_SUBMIT_APP_CLOSE: return initialForm;
    case DIALOG_SUBMIT_APP_UPDATE: {
      const { changes } = action;
      return Object.assign({}, state, changes);
    }
    default: return state;
  }
};

const open = (state = false, action) => {
  switch (action.type) {
    case DIALOG_SUBMIT_APP_CLOSE: return false;
    case DIALOG_SUBMIT_APP_OPEN: return true;
    default: return state;
  }
};

const submitApp = combineReducers({
  form,
  open,
});

export default combineReducers({ submitApp });
