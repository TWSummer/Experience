import * as APIUtil from '../util/experiences_util';

export const RECEIVE_EXPERIENCES = "RECEIVE_EXPERIENCES";
export const RECEIVE_EXPERIENCE_ERRORS = "RECEIVE_EXPERIENCE_ERRORS";

const receiveExperiences = experiences => ({
  type: RECEIVE_EXPERIENCES,
  experiences
});

const receiveErrors = errors => ({
  type: RECEIVE_EXPERIENCE_ERRORS,
  errors
});

export const fetchExperiences = (quantity, offset) => dispatch => {
  return (
    APIUtil.fetchExperiences(quantity, offset)
      .then(
        experiences => dispatch(receiveExperiences(experiences)),
        errors => dispatch(receiveErrors(errors))
      )
  );
};
