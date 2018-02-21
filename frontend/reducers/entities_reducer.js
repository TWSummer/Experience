import { combineReducers } from 'redux';
import experiencesReducer from './experiences_reducer';

const entitiesReducer = combineReducers({
  experiences: experiencesReducer
});

export default entitiesReducer;
