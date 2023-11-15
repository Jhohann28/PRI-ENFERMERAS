import React, { useEffect } from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from '../../Components/Administrator/AdminHomeInterface';
import NurseList from '../../Components/Administrator/NurseList';
import ServiceForm from '../../Components/Administrator/ServiceForm';



import NurseHome from "../../Components/Nurse/NurseHome"
import AtentionRequestOpen from '../../Components/Nurse/GiveAtention/AtentionRequestOpen';
import UserList from '../../Components/Administrator/UserList';
import ReportScreen from '../../Components/General/ReportScreen';

import AdminAtentionOpen from '../../Components/Administrator/AdminAtentionOpen';
const Stack = createStackNavigator();


const HomeNavigation = () => {


  return (
    
      <Stack.Navigator initialRouteName="AdminScreen">
        <Stack.Screen name="AdminScreen" component={AdminScreen}  options={{headerShown:false}} />

        <Stack.Screen name="NurseList" component={NurseList}  options={{headerShown:false}} />
        <Stack.Screen name="ServiceForm" component={ServiceForm}  options={{headerShown:false}} />
        <Stack.Screen name="UserList" component={UserList}  options={{headerShown:false}} />
        <Stack.Screen name="Reports" component={ReportScreen}  options={{headerShown:false}} />
        <Stack.Screen name="AOpen" component={AdminAtentionOpen}  options={{headerShown:false}} />

      </Stack.Navigator>

  );
};
export default HomeNavigation