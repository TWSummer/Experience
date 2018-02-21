import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import NavBarContainer from './navigation/nav_bar_container';

export default ({ store }) => (
  <Provider store={store}>
    <HashRouter>
        <NavBarContainer />
    </HashRouter>
  </Provider>
);
