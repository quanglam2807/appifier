import { combineReducers } from 'redux';

import {
  DIALOG_CREATE_CUSTOM_APP_CLOSE,
  DIALOG_CREATE_CUSTOM_APP_CREATE_FAILED,
  DIALOG_CREATE_CUSTOM_APP_CREATE_REQUEST,
  DIALOG_CREATE_CUSTOM_APP_CREATE_SUCCESS,
  DIALOG_CREATE_CUSTOM_APP_FORM_UPDATE,
  DIALOG_CREATE_CUSTOM_APP_OPEN,
} from '../../../constants/actions';

const open = (state = false, action) => {
  switch (action.type) {
    case DIALOG_CREATE_CUSTOM_APP_CLOSE: return false;
    case DIALOG_CREATE_CUSTOM_APP_OPEN: return true;
    default: return state;
  }
};

const formInitialState = {
  name: '',
  url: '',
  icon: null,
};
const form = (state = formInitialState, action) => {
  switch (action.type) {
    case DIALOG_CREATE_CUSTOM_APP_CLOSE: return formInitialState;
    case DIALOG_CREATE_CUSTOM_APP_FORM_UPDATE: {
      const { changes } = action;
      return { ...state, ...changes };
    }
    default: return state;
  }
};

const isCreating = (state = false, action) => {
  switch (action.type) {
    case DIALOG_CREATE_CUSTOM_APP_CREATE_FAILED: return false;
    case DIALOG_CREATE_CUSTOM_APP_CREATE_REQUEST: return true;
    case DIALOG_CREATE_CUSTOM_APP_CREATE_SUCCESS: return false;
    default: return state;
  }
};

export default combineReducers({
  form,
  isCreating,
  open,
});
