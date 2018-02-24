import * as APIUtil from '../util/experiences_util';

export const RECEIVE_EXPERIENCES = "RECEIVE_EXPERIENCES";
export const RECEIVE_EXPERIENCE_ERRORS = "RECEIVE_EXPERIENCE_ERRORS";
export const RECEIVE_EXPERIENCE = "RECEIVE_EXPERIENCE";

const receiveExperiences = experiences => ({
  type: RECEIVE_EXPERIENCES,
  experiences
});

const receiveExperience = experience => ({
  type: RECEIVE_EXPERIENCE,
  experience
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

export const createExperience = (exp) => dispatch => {
  return (
    APIUtil.createExperience(exp)
      .then(
        experience => dispatch(receiveExperience(experience)),
        errors => dispatch(receiveErrors(errors))
      )
  );
};

export const fetchExperience = (expID) => dispatch => {
  return (
    APIUtil.fetchExperience(expID)
      .then(
        experience => dispatch(receiveExperience(experience)),
        errors => dispatch(receiveErrors(errors))
      )
  );
};
