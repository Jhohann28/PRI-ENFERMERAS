import React, { useEffect } from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../Components/User/UserHomeInterface';
import ServiceRequestUser from '../../Components/User/ServiceRequest';
import ServiceWaitInterface from '../../Components/User/ServiceWaitInterface.js';
import MapDetailInterface from '../../Components/User/MapDetailInterface.js';
import HistoryAttentionUser from '../../Components/User/HistoryAttentionUser/HistoryAttentionUser';
import MyAtentionUserOpen from '../../Components/User/HistoryAttentionUser/MyAtentionUser';



const Stack = createStackNavigator();

const HistoryAtentionUserNav = () => {


  return (
    <Stack.Navigator initialRouteName="HistoryAttentionUser">

    
    <Stack.Screen name="HistoryAttentionUser" component={HistoryAttentionUser}  options={{headerShown:false}} />
    <Stack.Screen name="MyUserAtentionOpen" component={MyAtentionUserOpen}  options={{headerShown:false}} />
    

    </Stack.Navigator>
  );
};

export default HistoryAtentionUserNav;
