import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './modules';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(ReduxThunk)),
);

export default store;
