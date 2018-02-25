import { connect } from 'react-redux';
import { checkLoginState, logoutUser} from '../../actions/session_actions';
import { searchExperiences } from '../../actions/experience_actions';
import { withRouter } from 'react-router-dom';
import NavBar from './nav_bar';


const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => {
  return {
    // logout: () => dispatch(logout()),
    checkLoginState: () => dispatch(checkLoginState()),
    logoutUser: () => dispatch(logoutUser()),
    searchExperiences: (query) => dispatch(searchExperiences(query))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
