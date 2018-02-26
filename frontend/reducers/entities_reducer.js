import { combineReducers } from 'redux';
import experiencesReducer from './experiences_reducer';
import searchResultsReducer from './search_results_reducer';

const entitiesReducer = combineReducers({
  experiences: experiencesReducer,
  searchResults: searchResultsReducer
});

export default entitiesReducer;
