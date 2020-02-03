import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SplashScreen from './../screens/splashScreen'
import MainAppScreen from './../screens/mainAppScreen'

const screens = {
    Login: {
        screen: SplashScreen
    },
    MainScreen: {
        screen: MainAppScreen
    }
}

const LoginStack = createStackNavigator(screens);

export default createAppContainer(LoginStack);