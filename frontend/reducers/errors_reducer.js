import { combineReducers } from 'redux';
import formErrorsReducer from './form_errors_reducer';

const errorsReducer = combineReducers({
  formErros: formErrorsReducer
});

export default errorsReducer;
