import SmallExperience from './small_experience';
import { connect } from 'react-redux';
import { fetchExperiences,
        voteOnExperience } from '../../actions/experience_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    experiences: state.entities.experiences
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchExperiences: (quantity, offset) =>
      dispatch(fetchExperiences(quantity, offset)),
    voteOnExperience: (expID, vote) =>
      dispatch(voteOnExperience(expID, vote))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallExperience);
