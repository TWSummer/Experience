import merge from 'lodash/merge';
import { RECEIVE_EXPERIENCES } from '../actions/experience_actions';

const experiencesReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_EXPERIENCES:
      let newArr = state.slice(0);
      newArr = newArr.concat(action.experiences);
      return newArr;
    default:
      return state;
  }
};

export default experiencesReducer;
