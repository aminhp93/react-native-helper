import axios from 'axios';
import { ResponseCode } from '../constants/common';

const client = axios.create();


const request = (options) => {
    const onSuccess = res => res;
    const onError = (err) => {
      const isAuthorizationError = err.response &&
        (err.response.status === 403 || err.response.status === 401);
      const isOnBoardingError = err.response &&
        err.response.status === 400 && err.response.data.code === ResponseCode.SESSION_INVALID_CODE;
      const isEventGuestSpaceError = err.response &&
        err.response.status === 400 && err.response.data.code === ResponseCode.NOT_ENOUGH_SPACES;
      const isMattermostError = err.response &&
              err.response.status === 404 &&
              err.response.data.error_code === ResponseCode.MATTERMOST_NOT_FOUND;
      const errorMessage = err.response && err.response.data &&
        (err.response.data.error_message || err.response.data.message || err.response.data[0]);
      if (errorMessage && !isAuthorizationError
          && !isOnBoardingError && !isMattermostError && !isEventGuestSpaceError) {
        toastr.error(errorMessage);
      }
      throw err;
    };
  
    return client(options)
      .then(onSuccess)
      .catch(onError);
  };
  
  export default request;