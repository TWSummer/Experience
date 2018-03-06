import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import {checkLoginState} from './actions/session_actions';
import Root from './components/root';

//This method is called in the window once Facebook has been loaded in our script tags
window.fbAsyncInit = function() {
  FB.init({
    appId      : window.appID,
    status     : true,
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });
  FB.getLoginStatus();
  //Subscribe to a crazy event that facebook provides, instead of DOMContentLoaded
  FB.Event.subscribe('auth.statusChange', function(response) {
    const root = document.getElementById('root');
    let store = configureStore();
    //Required for facebook auth;


    //Required for bootstrapping user
    // if(response.status == 'connected') {
    store.dispatch(checkLoginState());
    let rootComponent = <Root store={store} />;
    // }
    window.store = store;
    ReactDOM.render(rootComponent, root);
  });

};
