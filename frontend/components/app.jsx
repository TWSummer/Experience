import { Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomePageContainer from './home/home_page_container';
import NavBarContainer from './navigation/nav_bar_container';
import CreateContainer from './create/create_container';
import ExperienceShowContainer from './experiences/experience_show_container';


const App = () => (
  <div className="full-page-body">
    <NavBarContainer />
    <Switch>
      <Route path="/home" component={HomePageContainer} />
      <ProtectedRoute path="/create" component={CreateContainer} />
<<<<<<< HEAD
      <Route path="/activitytest" component={ExperienceShowContainer}/>
=======
      <Route path="/experience/:id" component={ExperienceShowContainer}/>
>>>>>>> d38c9eabc9d5f0bd476a8fda22ff20b8a21eb239
    </Switch>
  </div>
);

export default App;
