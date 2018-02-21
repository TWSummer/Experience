import {merge} from 'lodash';
import {
  RECEIVE_CURRENT_USER,
  REMOVE_CURRENT_USER,
} from  '../actions/session_actions';
const _nullSession = {
  currentUser: null,
};

export default (state = _nullSession, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      let newState = {
        currentUser: {
          id: action.id,
          name: action.name,
          pictureURL: action.pictureUrl,
        }

      };
      return newState;
    case REMOVE_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
};
