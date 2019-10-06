import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "../Routes";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { usersReducer } from "../usersReducer";
import { renderRoutes } from "react-router-config";

const INITIAL_STATE = window.INITIAL_STATE;

const middleware = [thunk];

ReactDOM.hydrate(
  <Provider
    store={createStore(
      combineReducers({
        users: usersReducer
      }),
      INITIAL_STATE,
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : nope => nope
      )
    )}
  >
    <Router>
      <Switch>{renderRoutes(Routes)}</Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
