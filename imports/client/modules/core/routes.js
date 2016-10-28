import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Core Components
import Layout from './components/layout';
import HomePage from './components/homePage';
import Login from './containers/login';
import NotFound from './components/not-found';
import RecoverPassword from './containers/recover-password';
import ResetPassword from './containers/reset-password';
import Signup from './containers/signup';

// Admin Components
import AdminPage from '../admin/components/AdminPage';

// Documents Components
import Documents from '../documents/components/documents';

export default function (injectDeps, { Meteor, Store }) {
  const history = syncHistoryWithStore(browserHistory, Store);
  const LayoutCtx = injectDeps(Layout);

  const requireAuth = (nextState, replace) => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };

  ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <Route path="/" component={LayoutCtx}>
          <IndexRoute component={HomePage} onEnter={ requireAuth } />
          <Route name="admin" path="/admin" component={ AdminPage } />
          <Route
            name="documents"
            path="/documents"
            component={ Documents }
            onEnter={ requireAuth }
          />
          <Route name="login" path="/login" component={ Login } />
          <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
          <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
          <Route name="signup" path="/signup" component={ Signup } />
          <Route path="*" component={ NotFound } />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('react-root')
  );
}
