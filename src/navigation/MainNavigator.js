import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../../src/screens/HomeScreen';

const MainNavigator = createStackNavigator({
    Home: HomeScreen,
});

export default MainNavigator;
