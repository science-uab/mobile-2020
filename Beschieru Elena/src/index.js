import React from "react";
import reactDOM from "react-dom";
import App from "./components/App";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { helloSaga } from "./saga/saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(helloSaga);

const action = type => store.dispatch({ type });

reactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
