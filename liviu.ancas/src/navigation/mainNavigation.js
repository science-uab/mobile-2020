import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainAppScreen from '../screens/mainAppScreen'
import testScreen from '../screens/testScreen'

const MainNavigator = createStackNavigator({
    Home: {
        screen: MainAppScreen,
        navigationOptions: {
            title: "Home Screen",
            headerStyle : { backgroundColor: "#ccf2ff"}
        }
    },
    Test: { screen: testScreen },
});

const Navigation = createAppContainer(MainNavigator);

export default Navigation;