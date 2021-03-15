import * as React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Provider, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import store from './redux/configureStore';
import { history } from './redux/configureStore';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import { loggedUserInfo } from './redux/actions';
import { ReduxState } from './redux/reducer';

interface ProtectedRouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path: string;
}

interface AltRouteProps extends ProtectedRouteProps {
  isValid: boolean;
}

const AltRoute = (props: AltRouteProps) => {
  const { component: Component, isValid, ...rest } = props;
  return (
    <Route {...rest} render={
      props => isValid
        ?
        <Component {...rest} {...props} />
        :
        <Redirect to={
          {
            pathname: '/',
            state: {
              from: props.location
            }
          }
        } />
    } />
  )
};

const AdminProtectedRoute = (props: ProtectedRouteProps) => {
  const { user: { currentUser: { is_admin: isAdmin } } } = useSelector(({ state }: ReduxState) => state);

  return (
    <AltRoute {...props} isValid={!!isAdmin} />
  );
}

const UserProtectedRoute = (props: ProtectedRouteProps) => {
  const { user: { accessToken } } = useSelector(({ state }: ReduxState) => state);

  return (
    <AltRoute {...props} isValid={!!accessToken} />
  );
}

function App() {
  React.useEffect(() => {
    store.dispatch(loggedUserInfo());
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Loader>
            <Route exact={true} path='/' component={Home} />
            <Route path='/signup' component={Registration} />
            <Route path='/signin' component={Login} />
            <UserProtectedRoute path='/profile/:id' component={Profile} />
            <AdminProtectedRoute path='/dashboard' component={Dashboard} />
          </Loader>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
