import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };

    this.update = this.update.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchExperiences(this.state.searchQuery);
    
  }

  render() {
    const display = this.props.currentUser ? (
    <div className="user-info" onClick={this.toggleDropdown}>
      <img className="profile-picture" src={this.props.currentUser.pictureURL}>
      </img>
      <span className="username">{this.props.currentUser.name.toUpperCase()}</span>
      <button
        className="logout-button btn"
        onClick={(e) => {
          console.log("click");
          this.handleLogout(e);
        }}>
        <i className="fab fa-facebook-square"></i>
          <span className="logout-text">Log Out</span>
        </button>
    </div>
  ) : (
    <div className="session-controls">
      <button
        className="login-button btn"
        onClick={(e) => {
          console.log("click");
          this.handleLogin(e);
        }}>
        <i className="fab fa-facebook-square"></i> Login
      </button>
    </div>
  );

    return (
      <nav>
        <nav className="nav-content-box">
        <ul className="left-nav">
          <Link className='logo' to='/home'>
            <span>x</span><span>PERIENCITY</span>
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
