import Iso from 'iso';
import React from 'react';

import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'
import { renderToString } from 'react-dom/server'

import alt from 'altInstance';
import routes from 'routes.js';
import html from 'base.html';

const renderToMarkup = (alt, state, req, res, cb) => {
    
    alt.bootstrap(state);
    let location = createLocation(req.url);
    match({routes, location}, (error, redirectLocation, renderProps) => {
        if(redirectLocation){
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if(error) {
            res.send(500, error.message);
        } else if(renderProps == null){
            res.send(404, 'Not found');
        } else {
            let content = renderToString(<RoutingContext {...renderProps} />);
            let markup = Iso.render(content, alt.flush());
            cb(html.replace('CONTENT', markup));
        }
    });
};

export default function render(state, req, res, cb) {
  renderToMarkup(alt, state, req, res, cb);
  //return html.replace('CONTENT', markup);
};