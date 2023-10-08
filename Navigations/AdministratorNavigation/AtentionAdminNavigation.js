import React, { useEffect } from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from '../../Components/Administrator/AdminHomeInterface';
import NurseList from '../../Components/Administrator/NurseList';
import AtentionsListAdmin from '../../Components/Administrator/AtentionsListAdmin';
import AdminAtentionOpen from '../../Components/Administrator/AdminAtentionOpen';



const Stack = createStackNavigator();

const AtentionAdminNavigation = () => {


  return (
    
      <Stack.Navigator initialRouteName="AtentionAdminList">
        <Stack.Screen name="AtentionAdminList" component={AtentionsListAdmin}  options={{headerShown:false}} />
        <Stack.Screen name="AtentionAdminOpen" component={AdminAtentionOpen}  options={{headerShown:false}} />

      </Stack.Navigator>

  );
};
export default AtentionAdminNavigation;