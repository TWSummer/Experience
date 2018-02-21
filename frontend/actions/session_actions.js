import {
  loginUser,
} from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

const receiveUser = (response) => ({
  type: RECEIVE_CURRENT_USER,
  id: response.id,
  name: response.name,
  pictureUrl: response.picture.data.url
});

export const checkLoginState = (a) => (dispatch) => FB.getLoginStatus(function(response) {
  console.log("arg? ", a);
  if (response.status === 'connected') {
    console.log(response);
    loginUser(response.authResponse.userID, response.authResponse.accessToken);
    dispatch(fetchNameAndPicture());
  }
});

export const fetchNameAndPicture = () => (dispatch) => {
  return FB.api('me?fields=id,name,picture', function(response) {
    dispatch(receiveUser(response));
  });
};

window.fbAsyncInit = function() {
  console.log("init!");
  FB.init({
    appId      : '867019043470476',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });
};
