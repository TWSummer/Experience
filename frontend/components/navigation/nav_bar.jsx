import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };

    this.update = this.update.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentWillReceiveProps() {
  }

  update(attribute) {
    return (e) => {
      this.setState({
        [attribute]: e.target.value
      });
    };
  }

  handleLogin(e) {
    e.preventDefault();

    //Prompts FB login popup, and calls checkLoginState after user has
    //Completed or exited auth process
    FB.login(this.props.checkLoginState);

  }

  handleDemo(e) {
    e.preventDefault();
    this.props.loginDemo();
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.resetSearch();
    this.props.searchExperiences(this.state.searchQuery);
    this.props.history.push(`/search/${this.state.searchQuery}`);
  }

  render() {
    const display = this.props.currentUser ? (
    <div className="user-info" onClick={this.toggleDropdown}>
      <div className="nav-create-exp">
        <Link to="/create">
          <img src="http://www.pvhc.net/img242/rjaiuxatkezwbzzpnzth.jpg"></img>
          <i className="fas fa-plus"></i>
        </Link>
      </div>
      <img className="profile-picture" src={this.props.currentUser.pictureURL}>
      </img>
      <span className="username">{this.props.currentUser.name.toUpperCase()}</span>
      <button
        className="logout-button btn"
        onClick={(e) => {
          this.handleLogout(e);
        }}>
        <i className="fab fa-facebook-square"></i>
          <span className="logout-text">Log Out</span>
        </button>
    </div>
  ) : (
    <div className="session-controls">
      <div className="nav-create-exp">
        <div onClick={(e) => {this.handleLogin(e);}}>
          <img src="http://www.pvhc.net/img242/rjaiuxatkezwbzzpnzth.jpg"></img>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <button
        className="demo-button btn"
        onClick={(e) => {
          this.handleDemo(e);
        }}>
        Demo
      </button>
      <button
        className="login-button btn"
        onClick={(e) => {
          this.handleLogin(e);
        }}>
        <i className="fab fa-facebook-square"></i> Log In
      </button>

    </div>
  );

    return (
      <nav>
        <nav className="nav-content-box">
        <ul className="left-nav">
          <Link className='logo' to='/home'>
            <span>x</span><span>PERIENCE.CITY</span>
          </Link>
          <form
            onSubmit={this.handleSubmit}
            className="search-container">
            <input
              placeholder="find adventure"
              onChange={this.update("searchQuery")}
              type="search"
              value={this.state.searchQuery}></input>
          </form>
        </ul>
          {display}
        </nav>
      </nav>
    );
  }
}

export default NavBar;
