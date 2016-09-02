import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Components
import Layout from './components/layout';
import HomePage from './components/homePage';
import ProfilePage from '../user/components/profilePage';

export default function (inject, {Store}) {
  const history = syncHistoryWithStore(browserHistory, Store);

  ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={HomePage} />
          <Route path="profile" component={ProfilePage} />
        </Route>
      </Router>
    </Provider>,
    document.body
  );
};
