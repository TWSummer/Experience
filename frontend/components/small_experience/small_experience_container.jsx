import SmallExperience from './small_experience';
import { connect } from 'react-redux';
import { fetchExperiences } from '../../actions/experience_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    experiences: state.entities.experiences
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchExperiences: (quantity, offset) =>
      dispatch(fetchExperiences(quantity, offset))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmallExperience);
