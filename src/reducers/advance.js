import {
  TOGGLE_ADVANCE_DIALOG,
} from '../constants/actions';

const initialState = {
  isOpen: false,
};

const advance = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADVANCE_DIALOG: {
      return Object.assign({}, state, {
        isOpen: !state.isOpen,
      });
    }
    default:
      return state;
  }
};

export default advance;
