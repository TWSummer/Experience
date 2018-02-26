export const RECEIVE_FORM_ERRORS = "RECEIVE_FORM_ERRORS";
export const CLEAR_FORM_ERRORS = "CLEAR_FORM_ERRORS";

export const receiveFormErrors = errors => ({
  type: RECEIVE_FORM_ERRORS,
  errors
});

export const clearFormErrors = (experience) => ({
  type: CLEAR_FORM_ERRORS,
});
