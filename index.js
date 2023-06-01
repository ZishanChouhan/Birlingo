/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/reducer';

AppRegistry.registerComponent(appName, () => RootApp);

export const RootApp = () => {
  return(
    <Provider store={store}><App/></Provider>
  )
}