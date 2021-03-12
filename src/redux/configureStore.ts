import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducer';
import rootSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const logger = (createLogger as any)();
const history = createBrowserHistory();

const storeEnhacer = composeWithDevTools(applyMiddleware(logger, routerMiddleware(history), sagaMiddleware));

const store = createStore(createRootReducer(history), {}, storeEnhacer);

sagaMiddleware.run(rootSaga);

export { history };

export default store;
