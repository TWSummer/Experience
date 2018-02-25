import Create from './create';
import { connect } from 'react-redux';
import {createExperience} from "../../actions/experience_actions";

const mapStateToProps = (state, ownProps) => {
  return ({
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    createExperience: (experience, files) => dispatch(createExperience(experience, files)),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
