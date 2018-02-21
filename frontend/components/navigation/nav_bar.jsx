// let logoutButton = document.createElement("button");
// logoutButton.id = 'logout-button';
// logoutButton.innerHTML = 'Log Out';
//  document.getElementById('root').appendChild(logoutButton);
// logoutButton.addEventListener("click", (e) =>{
//   e.preventDefault();

// });




import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };

    //Initialize FB methods... substitute for bootstrapping user


    this.update = this.update.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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


    FB.login(this.props.checkLoginState);

  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const display = this.props.currentUser ? (
    <div className="user-info" onClick={this.toggleDropdown}>
      <img className="profile-picture" src={this.props.currentUser.pictureURL}>
      </img>
      <span>{this.props.currentUser.name}</span>
      <button
        className="logout-button btn"
        onClick={(e) => {
          console.log("click");
          this.handleLogout(e);
        }}>
        <i className="fab fa-facebook-square"></i> Log Out
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

        <ul className="left-nav">
          <Link className='logo' to='/directory'>
            <span>x</span><span>perience</span>
          </Link>

          <form
            onSubmit={this.handleSubmit}
            className="search-container">


            <input

              placeholder="Search"
              onChange={this.update("searchQuery")}
              type="search"
              value={this.state.searchQuery}></input>
          </form>
        </ul>

          {display}
      </nav>
    );
  }
}

export default NavBar;
