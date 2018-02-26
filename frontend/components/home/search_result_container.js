import HomePage from './home_page';
import { connect } from 'react-redux';
import { fetchExperiences } from '../../actions/experience_actions';

const mapStateToProps = (state, ownProps) => {
  let experiences = Object.values(state.entities.searchResults);
  experiences.sort((a, b) => (a.Score < b.Score ? 1 : -1));
  return ({
    experiences
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
)(HomePage);
