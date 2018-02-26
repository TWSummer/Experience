import SmallExperience from './small_experience';
import { connect } from 'react-redux';
import { fetchExperiences,
        voteOnExperience } from '../../actions/experience_actions';

const mapStateToProps = (state, ownProps) => {
  let userID;
  if (state.session.currentUser) {
    userID = state.session.currentUser.id;
  }
  return ({
    experiences: state.entities.experiences,
    userID
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchExperiences: (quantity, offset) =>
      dispatch(fetchExperiences(quantity, offset)),
    voteOnExperience: (expID, vote, userID) =>
      dispatch(voteOnExperience(expID, vote, userID))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallExperience);
