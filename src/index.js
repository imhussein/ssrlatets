import "regenerator-runtime/runtime";
import * as express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Routes from "./Routes";
import { StaticRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { usersReducer } from "./usersReducer";
import { renderRoutes, matchRoutes } from "react-router-config";
import serialize from "serialize-javascript";

// Set Up The Renderer Server
const app = express();

const INITIAL_STATE = {};

// Set The Public Assets Folder To Boot Up React App In The Root Div After Server Send The Skeleton Less HTML Page From The Rendere Server
app.use("/assets", express.static("src/public"));

/**
 * Data Management For SSR
 * Redux Needs Differeent Configuration On Server VS Client Because of
 * 1 - Authentication Will Handled On Server
 * 2 - A way to detect when all initial data loading for all redux actions creators before rendring the HTML from server
 * 3 - Redux State Rehydration On The Browser
 */

const store = createStore(
  combineReducers({
    users: usersReducer
  }),
  INITIAL_STATE,
  applyMiddleware(thunk)
);

// Main Render Middleware
app.use(function(req, res, next) {
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    if (route.loadData) {
      return route.loadData(store);
    } else {
      return null;
    }
  });

  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={store}>
        {/**Server Side Redux Store Created For Initial Data Loading And Make Detection Before Rendering HTML On Server */}
        <Router context={{}} location={req.path}>
          {/** Set Up Routing Route Configuration For Server With Static Router Object For SSR (No Address Bar For Server) For Route Matching From Client Side Routing Configuration */}
          <Switch>{renderRoutes(Routes)}</Switch>
          {/**To Make Server Check With React Router Config Which Component Requires Data Loading Before Render It */}
        </Router>
      </Provider>
    );

    // Set Markup And Send From The Renderer Server
    const markup = `
      <html lang="en">
        <head>
          <link rel='stylesheet' href='/assets/app.css' />
        </head>
        <body>
          <div id='root'>${content}</div>
          <script>window.INITIAL_STATE=${serialize(store.getState())}</script>
          <script src='/assets/client_bundle.js'></script>
        </body>
      </html>
    `;

    // Send HTML Page To Client From Renderer Server
    res.send(markup);
  });
});

// Listen To Rendering Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Rendering Server started at port ${port}`);
});
