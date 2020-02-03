import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import SplashScreen from './src/screens/splashScreen'
import { Provider } from 'react-redux';

import configureStore from './src/store'

const store = configureStore();


export default function App() {
  return (
    <Provider store={store}>
      <SplashScreen />
    </Provider>
  );
}

