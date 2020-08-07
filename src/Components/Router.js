import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Home from 'Routes/Home';
import Detail from 'Routes/Detail';
import Search from 'Routes/Search';
import Tv from 'Routes/TV';
import Header from 'Components/Header';

export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/tv' exact component={Tv} />
      <Route path='/search' exact component={Search} />
      <Route path='/movie/:id' component={Detail} />
      <Route path='/show/:id' component={Detail} />
      <Redirect from='*' to='/' />
    </Switch>
  </Router>
);
