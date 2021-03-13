import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Provider, useDispatch } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom';
import store from './redux/configureStore';
import { history } from './redux/configureStore';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import { loggedUserInfo } from './redux/actions';

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
            <Route path='/profile/:id' component={Profile} />
            <Route path='/dashboard' component={Dashboard} />
          </Loader>
        </Switch>
      </ConnectedRouter>
		</Provider>
	);
}

export default App;
