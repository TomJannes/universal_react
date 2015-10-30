/*
 * Client side bootstrap with iso and alt
 */
import React from 'react';
import Iso from 'iso';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import { Router } from 'react-router';

import alt from './altInstance';
import routes from 'routes.js';

let history = createBrowserHistory();


Iso.bootstrap((state, _, container) => {
  alt.bootstrap(state);
  injectTapEventPlugin();
  ReactDOM.render(<Router history={history} children={routes} />, container);
  var styleEl = document.getElementById('css-style-collector-data');
  if (styleEl) {
    styleEl.remove();
  }
});
