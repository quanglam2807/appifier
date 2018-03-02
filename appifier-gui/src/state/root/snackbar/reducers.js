import {
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
} from '../../../constants/actions';

const initialState = {
  open: false,
  message: null,
  actionText: 'Close',
};

const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR: {
      return Object.assign({}, state, {
        open: true,
        message: action.message,
        actionText: action.actionText || initialState.actionText,
      });
    }
    case CLOSE_SNACKBAR: {
      return Object.assign({}, state, {
        open: false,
      });
    }
    default:
      return state;
  }
};

export default snackbar;
