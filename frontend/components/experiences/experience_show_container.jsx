import ExperienceShow from './experience_show';
import { connect } from 'react-redux';
import { fetchExperience,
         createExperience } from '../../actions/experience_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    experiences: state.entities.experiences
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchExperience: (expID) => dispatch(fetchExperience(expID)),
    createExperience: (exp) => dispatch(fetchExperience(exp))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceShow);
