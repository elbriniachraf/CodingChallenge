import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Main: MainNavigator,
});

export default createAppContainer(AppNavigator);
