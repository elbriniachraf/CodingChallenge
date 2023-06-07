import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import Welcompage from './src/screens/Auth/Welcompage';



export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="WelcomePage" component={Welcompage} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        
          <Stack.Screen name="register" component={RegisterScreen} />
        

  

        {/* <Stack.Screen name="WelcomePage" component={Welcompage}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="register" component={Signup} /> */}


        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
