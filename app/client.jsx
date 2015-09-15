/*
 * Client side bootstrap with iso and alt
 */
import React from 'react';
import Iso from 'iso';
import ReactDOM from 'react-dom';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import { Router } from 'react-router';

import alt from './altInstance';
import routes from 'routes.jsx';

let history = createBrowserHistory();


Iso.bootstrap((state, _, container) => {
  alt.bootstrap(state);
  ReactDOM.render(<Router history={history} children={routes} />, container);
});