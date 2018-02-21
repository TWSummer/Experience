import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import {checkLoginState} from './actions/session_actions';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store = configureStore();
  //Required for facebook auth;
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=867019043470476&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  //Required for bootstrapping user
  window.fbAsyncInit = function() {
    console.log("init!");
    FB.init({
      appId      : '867019043470476',
      status     : true,
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

    //Subscribe to a crazy event that facebook provides
    FB.Event.subscribe('auth.statusChange', function(response) {
      if(response.status == 'connected') {
        store.dispatch(checkLoginState());
      }
    });

  };
  window.store = store;
  ReactDOM.render(<Root store={store} />, root);
});
