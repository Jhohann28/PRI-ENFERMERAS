import React, { useEffect } from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../Components/User/UserHomeInterface';
import ServiceRequestUser from '../../Components/User/ServiceRequest';
import ServiceWaitInterface from '../../Components/User/ServiceWaitInterface.js';
import MapDetailInterface from '../../Components/User/MapDetailInterface.js';

const Stack = createStackNavigator();

const AttentionUserNav = () => {


  return (
    <Stack.Navigator initialRouteName="Home">

    <Stack.Screen name="Home" component={Home}  options={{headerShown:false}} />
    <Stack.Screen name="ServiceRequestUser" component={ServiceRequestUser}  options={{headerShown:false}} />
    <Stack.Screen name="ServiceWaitInterface" component={ServiceWaitInterface}  options={{headerShown:false}} />
    <Stack.Screen name="MapDetailInterface" component={MapDetailInterface}  options={{headerShown:false}} />
    

    </Stack.Navigator>
  );
};

export default AttentionUserNav;
