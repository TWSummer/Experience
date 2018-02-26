import * as APIUtil from '../util/search_util';

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const RESET_SEARCH_RESULTS = "RESET_SEARCH_RESULTS";
export const RECEIVE_SEARCH_ERRORS = "RECEIVE_SEARCH_ERRORS";

const receiveSearchResults = experiences => ({
  type: RECEIVE_SEARCH_RESULTS,
  experiences
});

const receiveSearchErrors = errors => ({
  type: RECEIVE_SEARCH_ERRORS,
  errors
});

export const resetSearch = () => ({
  type: RESET_SEARCH_RESULTS
});

export const searchExperiences = query => dispatch => {
  return (
    APIUtil.fetchSearchResults(query).then(
      experiences => dispatch(receiveSearchResults(experiences)),
      errors => dispatch(receiveSearchErrors(errors))
    )
  );
};
