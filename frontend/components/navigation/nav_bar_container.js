import { connect } from 'react-redux';
import { checkLoginState} from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import NavBar from './nav_bar';


const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => {
  return {
    // logout: () => dispatch(logout()),
    checkLoginState: () => dispatch(checkLoginState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
