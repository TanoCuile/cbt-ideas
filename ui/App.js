import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import Themes from './Themes';

import Nav from './components/Nav';

import ShareIdeaPage from './pages/ShareIdeaPage';
import HomePage from './pages/HomePage';
import IdeaDetailsPage from './pages/IdeaDetailsPage';

export default class App extends Component {
  render() {
    return (
      <Provider
        store={createStore(reducers, applyMiddleware(thunkMiddleware))}
      >
        <Router>
          <Themes>
            <>
              <Nav />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/ideas/create" component={ShareIdeaPage} />
              <Route path="/idea/:id" component={IdeaDetailsPage} />
            </>
          </Themes>
        </Router>
      </Provider>
    );
  }
}
