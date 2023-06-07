import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

const AuthNavigator = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
});

export default AuthNavigator;
