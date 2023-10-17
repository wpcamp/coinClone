import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import cryptoReducer from './crypto';
import commentsReducer from './comment'
import watchlistReducer from './watchlist';
import walletReducer from './wallet';
import newsReducer from './news'


const rootReducer = combineReducers({
  session,
  crypto: cryptoReducer,
  comments: commentsReducer,
  watchlist: watchlistReducer,
  wallet: walletReducer,
  news: newsReducer

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  const logger = require('redux-logger').default
  enhancer = applyMiddleware(thunk, logger);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
