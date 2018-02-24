import Create from './create';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return ({
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return ({

  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
