import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import Themes from './Themes';

import Nav from './components/Nav';

import ShareIdeaPage from './pages/ShareIdeaPage';
import HomePage from './pages/HomePage';
import IdeaDetailsPage from './pages/IdeaDetailsPage';

function getTokenFromQuery() {
  const query = window.location.href.split('?')[1];
  if (query) {
    const queryParams = query.split('&').reduce((total, piece) => {
      const [key, value] = piece.split('=');
      total[key] = value;
      return total;
    }, {});

    return queryParams.ct_tok;
  }
}

function authUser(token) {
  if (token) {
    const exdays = 1;
    const cookieName = 'ct_tok';
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + currentDate.toUTCString();
    document.cookie = cookieName + '=' + token + ';' + expires + ';path=/';
  }
}

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
              <Route
                component={props => {

                  const token = getTokenFromQuery();

                  authUser(token);

                  return (
                    <>
                      <Route exact path="/" component={HomePage} />
                      <Route
                        exact
                        path="/ideas/create"
                        component={ShareIdeaPage}
                      />
                      <Route path="/idea/:id" component={IdeaDetailsPage} />
                    </>
                )}}
              />
            </>
          </Themes>
        </Router>
      </Provider>
    );
  }
}
