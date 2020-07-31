import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import User from './pages/User';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/user" exact component={User}></Route>
    </BrowserRouter>
  );
};

export default Routes;
