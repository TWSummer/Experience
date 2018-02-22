import { Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomePageContainer from './home/home_page_container';
import NavBarContainer from './navigation/nav_bar_container';
import ExperienceShow from './experiences/experience_show';

const App = () => (
  <div className="full-page-body">
    <NavBarContainer />
    <Switch>
      <Route path="/home" component={HomePageContainer} />
      <Route path="/activitytest" component={ExperienceShow}/>
    </Switch>
  </div>
);

export default App;
