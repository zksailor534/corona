import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Core Components
import Layout from './components/layout';
import HomePage from './components/homePage';
import NotFound from './components/not-found';

// Admin Components
import Login from '../admin/containers/Login';
import Signup from '../admin/containers/Signup';
import RecoverPassword from '../admin/containers/RecoverPassword';
import ResetPassword from '../admin/containers/ResetPassword';
import AdminPage from '../admin/components/AdminPage';
import AcceptInvitation from '../admin/containers/AcceptInvitation';

// Documents Components
import Documents from '../documents/components/documents';

export default function (injectDeps, { Store }) {
  const history = syncHistoryWithStore(browserHistory, Store);
  const LayoutCtx = injectDeps(Layout);

  const requireAuth = (nextState, replace) => {
    const loggingIn = Store.getState().accounts.isFetching;
    const loggedIn = Store.getState().accounts.isAuthenticated;
    if (!loggingIn && !loggedIn) {
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
          <Route name="admin" path="/admin" component={ AdminPage } onEnter={ requireAuth } />
          <Route name="accept-invitation" path="/invite/:token" component={ AcceptInvitation } />
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
