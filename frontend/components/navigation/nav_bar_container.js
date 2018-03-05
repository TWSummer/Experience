import { connect } from 'react-redux';
import { checkLoginState, logoutUser, loginDemo} from '../../actions/session_actions';
import { searchExperiences, resetSearch } from '../../actions/search_actions';
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
    searchExperiences: (query) => dispatch(searchExperiences(query)),
    resetSearch: () => dispatch(resetSearch()),
    loginDemo: () => dispatch(loginDemo()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
