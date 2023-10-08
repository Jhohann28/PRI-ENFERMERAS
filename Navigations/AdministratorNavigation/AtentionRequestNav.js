import React, { useEffect } from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from '../../Components/Administrator/AdminHomeInterface';
import NurseList from '../../Components/Administrator/NurseList';
import AtentionsListAdmin from '../../Components/Administrator/AtentionsListAdmin';
import AdminAtentionOpen from '../../Components/Administrator/AdminAtentionOpen';
import AdminAtentionRequestList from '../../Components/Administrator/AdminAtentionRequestList';
import AtentionRequestOpen from '../../Components/Nurse/GiveAtention/AtentionRequestOpen';
import AtentionRequestOpenAdmin from '../../Components/Administrator/AtentionRequestOpenAdmin';



const Stack = createStackNavigator();

const AtentionRequestNav = () => { //admin


  return (
    
      <Stack.Navigator initialRouteName="AtentionAdminList">
        <Stack.Screen name="AtentionAdminList" component={AdminAtentionRequestList}  options={{headerShown:false}} />
        <Stack.Screen name="AtentionOpenAdmin" component={AtentionRequestOpenAdmin}  options={{headerShown:false}} />
        <Stack.Screen name ="AtentionByRef" component={AdminAtentionOpen} options={{headerShown:false}} />
      </Stack.Navigator>

  );
};
export default AtentionRequestNav;