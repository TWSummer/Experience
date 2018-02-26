import * as APIUtil from '../util/experiences_util';
import {uploadFiles} from '../util/upload_util';
export const RECEIVE_EXPERIENCES = "RECEIVE_EXPERIENCES";
export const RECEIVE_EXPERIENCE_ERRORS = "RECEIVE_EXPERIENCE_ERRORS";
export const RECEIVE_EXPERIENCE = "RECEIVE_EXPERIENCE";
export const RECEIVE_EXPERIENCE_VOTE = "RECEIVE_EXPERIENCE_VOTE";

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

//not currently in use, here for when we want to change the
//user state to include their voted on experiences
const receiveExperienceVote = experience => ({
  type: RECEIVE_EXPERIENCE_VOTE,
  experience
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

export const createExperience = (exp, files) => dispatch => {
  return (
    APIUtil.createExperience(exp)
      .then(
        experience => {
          dispatch(receiveExperience(experience));
          dispatch(uploadImages(experience.ID, files));
          return experience;
        },
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

export const voteOnExperience = (expID, vote, userID) => dispatch => {
  return (
    APIUtil.voteOnExperience(expID, vote, userID)
      .then(
        experience => dispatch(receiveExperience(experience)),
        errors => dispatch(receiveErrors(errors))
      )
  );
};

export const uploadImages = (expID, files) => dispatch => {
  return (
    uploadFiles(expID, files).then(
      experience => {
        
        dispatch(receiveExperience(experience));
        return experience;
      },
      errors => dispatch(receiveErrors(errors))
    )
  );
};
