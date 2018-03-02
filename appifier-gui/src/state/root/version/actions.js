import {
  versionGetRequest,
  // versionGetSuccess,
  // versionGetFailed,
} from './action-creators';

export const getVersion = () =>
  (dispatch) => {
    dispatch(versionGetRequest());
  };
