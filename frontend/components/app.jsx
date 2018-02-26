import { Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomePageContainer from './home/home_page_container';
import SearchResultContainer from './home/search_result_container';
import NavBarContainer from './navigation/nav_bar_container';
import CreateContainer from './create/create_container';
import ExperienceShowContainer from './experiences/experience_show_container';


const App = () => (
  <div className="full-page-body">
    <NavBarContainer />
    <Switch>
      <Route path="/home" component={HomePageContainer} />
      <Route path="/create" component={CreateContainer} />
      <Route path="/activitytest" component={ExperienceShowContainer}/>
      <Route path="/experience/:id" component={ExperienceShowContainer}/>
      <Route path="/search/:query" component={SearchResultContainer} />
    </Switch>
  </div>
);

export default App;
