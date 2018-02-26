import Create from './create';
import { connect } from 'react-redux';
import {createExperience} from "../../actions/experience_actions";
import {receiveFormErrors, clearFormErrors} from "../../actions/form_error_actions";
const mapStateToProps = (state, ownProps) => {
  return ({
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createExperience: (experience, files) => dispatch(createExperience(experience, files)),
    receiveFormErrors: (errors) => dispatch(receiveFormErrors(errors)),
    clearFormErrors: () => dispatch(clearFormErrors()),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
