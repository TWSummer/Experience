import {
  loginUser,
} from '../util/session_api_util';



export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const REMOVE_CURRENT_USER = "REMOVE_CURRENT_USER";
export const FBINIT = "FBINIT";


const receiveUser = (response) => ({
  type: RECEIVE_CURRENT_USER,
  id: response.id,
  name: response.name,
  pictureUrl: response.picture.data.url
});

const receiveServerUser = (response) => ({

});

const removeUser = (response) => ({
  type: REMOVE_CURRENT_USER,
});

const fbInit = () => ({
  type: FBINIT,
});

export const checkLoginState = (a) => (dispatch) => FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    loginUser(response.authResponse.userID, response.authResponse.accessToken);
    dispatch(fetchNameAndPicture());
  }
});

export const fetchNameAndPicture = () => (dispatch) => {
  return FB.api('me?fields=id,name,picture', function(response) {
    dispatch(receiveUser(response));
  });
};

export const loginDemo = () => (dispatch) => {
    loginUser("1", "demo");
    dispatch(receiveUser({
      id: "1",
      name: "David Chang",
      picture: {data: {url: "http://www.allcladchefs.com/content/ambassadors/chefs/thumbs/david-chang.jpg"}},
    }));


};


export const logoutUser = () => dispatch => {
  FB.api("/me/permissions", "delete", function(response){
    dispatch(removeUser(response));
  });
};
