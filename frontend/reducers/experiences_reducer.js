import merge from 'lodash/merge';
import { RECEIVE_EXPERIENCES,
         RECEIVE_EXPERIENCE
       } from '../actions/experience_actions';

const experiencesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_EXPERIENCES:
      newState = merge({}, state);
      action.experiences.forEach(exp => {
        newState[exp.ID] = exp;
      });
      return newState;
    case RECEIVE_EXPERIENCE:
      newState = merge({}, state, {[action.experience.ID]: action.experience});
      return newState;
    default:
      return state;
  }
};

export default experiencesReducer;
