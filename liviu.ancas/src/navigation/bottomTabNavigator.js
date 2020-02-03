import React from 'react';
import { createAppContainer } from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import { FontAwesome5 } from "@expo/vector-icons";

import AdaugaComanda from '../screens/adaugaComanda'
import AdaugaRezervare from '../screens/adaugaRezervare'
import StatusScreen from '../screens/statusScreen'


const TabNavigator = createMaterialBottomTabNavigator({
    Status: {
        screen: StatusScreen,
        navigationOptions: {
            tabBarIcon: () => <FontAwesome5 name="eye" size={24} color="#CDCCCE" />,
            activeColor: '#ffffff',
            inactiveColor: '#66c2ff',
            barStyle: { backgroundColor: '#0086b3' },
        }
    },
    Comanda: {
        screen: AdaugaComanda,
        navigationOptions: {
            tabBarIcon: () => <FontAwesome5 name="cart-plus" size={24} color="#CDCCCE" />,
            activeColor: '#ffffff',
            inactiveColor: '#d2a679',
            barStyle: { backgroundColor: '#ac7339' },
        }
    },
    Rezervare: {
        screen: AdaugaRezervare,
        navigationOptions: {
            tabBarIcon: () => <FontAwesome5 name="calendar-check" size={24} color="#CDCCCE" />,
            activeColor: '#ffffff',
            inactiveColor: '#92c5c2',
            barStyle: { backgroundColor: '#2c6d6a' },                
        }    
    }
});

export default createAppContainer(TabNavigator);