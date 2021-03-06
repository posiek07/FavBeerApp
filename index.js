/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//Store
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import beersReducer from './store/reducers/beersReducer';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';



const rootReducer = combineReducers({
  beers: beersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const providedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => providedApp);
