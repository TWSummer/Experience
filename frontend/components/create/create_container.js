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
    createExperience: (experience) => dispatch(createExperience(experience)),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
