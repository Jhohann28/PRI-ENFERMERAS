import React, { useEffect } from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from '../../Components/Administrator/AdminHomeInterface';
import NurseList from '../../Components/Administrator/NurseList';
import ServiceForm from '../../Components/Administrator/ServiceForm';



const Stack = createStackNavigator();

const HomeNavigation = () => {


  return (
    
      <Stack.Navigator initialRouteName="AdminScreen">
        <Stack.Screen name="AdminScreen" component={AdminScreen}  options={{headerShown:false}} />

        <Stack.Screen name="NurseList" component={NurseList}  options={{headerShown:false}} />
        <Stack.Screen name="ServiceForm" component={ServiceForm}  options={{headerShown:false}} />

      </Stack.Navigator>

  );
};
export default HomeNavigation;