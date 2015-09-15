import React from 'react';
import {Router, Route} from 'react-router';

import App from './components/App';
import Hello from './components/Hello';
import Test from './components/Test';
//import HelloWorld from './components/HelloWorld';
//import HelloPlanet from './components/HelloPlanet';

export default (
    <Route component={App}>
      <Route path="/" component={Hello} />
      <Route path="/test" component={Test} />
    </Route>
);