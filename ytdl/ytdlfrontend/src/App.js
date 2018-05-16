import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ytdlbackend from "./reducers";
import Ytdl from "./components/Ytdl";
import NotFound from "./components/NotFound";
import thunk from "redux-thunk";

let store = createStore(ytdlbackend, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Ytdl} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;