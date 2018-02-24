import ExperienceShow from './experience_show';
import { connect } from 'react-redux';
import { fetchExperience,
         createExperience } from '../../actions/experience_actions';
import { singleExperience } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  return ({
    experience: singleExperience(state, ownProps)
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
