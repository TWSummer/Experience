import ExperienceShow from './experience_show';
import { connect } from 'react-redux';
import { fetchExperience,
         createExperience } from '../../actions/experience_actions';
import { singleExperience } from '../../reducers/selectors';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  let queryString = ownProps.location.search;
  let id = parseInt(queryString.split("=")[1]);
  return ({
    experience: singleExperience(state, ownProps),
    selected: id
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    fetchExperience: (expID) => dispatch(fetchExperience(expID)),
    createExperience: (exp) => dispatch(createExperience(exp))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceShow));
