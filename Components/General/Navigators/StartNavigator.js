import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartPage from '../StartPage';
import Loggin from '../Login';

const Stack = createStackNavigator();

const StartNavigator = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen name="Loggin" component={Loggin}  options={{headerShown:false}} />
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StartNavigator;
