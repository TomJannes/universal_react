import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from './components/App';
import Hello from './components/Hello';
import Test from './components/Test';
import Login from './components/Login';
import Client from './components/Client';

import UserStore from './stores/UserStore';

function requireAuth(nextState, transition) {
  if (!UserStore.getState().user.get('authenticated')) {
    transition({ nextPathname: nextState.location.pathname }, '/login?redirect=' + nextState.location.pathname, null);
    //transition({ nextPathname: nextState.location.pathname }, '/login', null);
  }
}
//<Route path="test" component={Test} onEnter={requireAuth} />
export default (
    <Route path='/' component={App}>
      <IndexRoute component={Hello}/>
      <Route path="home" component={Hello} />
      <Route path="test" component={Test}>
        <IndexRoute component={Test}/>
      </Route>
      <Route path="client" component={Client}>
        <IndexRoute component={Client}/>
      </Route>
      <Route path="login" component={Login} />
    </Route>
);