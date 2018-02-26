import merge from 'lodash/merge';
import { RECEIVE_FORM_ERRORS,
         CLEAR_FORM_ERRORS
       } from '../actions/form_error_actions';

const formErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  // let newState;
  switch(action.type) {
    case RECEIVE_FORM_ERRORS:
      return action.errors;
    case CLEAR_FORM_ERRORS:
      return [];
    default:
      return state;
  }
};

export default formErrorsReducer;
