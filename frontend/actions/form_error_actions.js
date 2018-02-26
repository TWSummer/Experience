export const RECEIVE_FORM_ERRORS = "RECEIVE_FORM_ERRORS";
export const CLEAR_FORM_ERRORS = "CLEAR_FORM_ERRORS";

const receiveFormErrors = errors => ({
  type: RECEIVE_FORM_ERRORS,
  errors
});

const clearFormErrors = (experience) => ({
  type: CLEAR_FORM_ERRORS,
});
