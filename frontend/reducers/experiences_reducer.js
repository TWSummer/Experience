import merge from 'lodash/merge';
import { RECEIVE_EXPERIENCES,
         RECEIVE_EXPERIENCE
       } from '../actions/experience_actions';

const experiencesReducer = (state = [], action) => {
  Object.freeze(state);
  let newArr = [];
  switch(action.type) {
    case RECEIVE_EXPERIENCES:
      newArr = state.slice(0);
      newArr = newArr.concat(action.experiences);
      return newArr;
    case RECEIVE_EXPERIENCE:
      newArr = state.slice(0);
      newArr = newArr.concat(action.experience);
      return newArr;
    default:
      return state;
  }
};

export default experiencesReducer;
