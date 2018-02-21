import { Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomePageContainer from './home/home_page_container';



const App = () => (
  <div className="full-page-body">
    <Switch>
      <Route path="/home" component={HomePageContainer} />
    </Switch>
  </div>
);

export default App;