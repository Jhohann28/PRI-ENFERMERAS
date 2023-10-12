import React, { useEffect } from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NurseHome from "../../Components/Nurse/NurseHome"
import AtentionRequestOpen from '../../Components/Nurse/GiveAtention/AtentionRequestOpen';

const Stack = createStackNavigator();

const AtentionNurseNav = () => {


  return (
    
      <Stack.Navigator initialRouteName="HomeNurse">
        <Stack.Screen name="HomeNurse" component={NurseHome}  options={{headerShown:false}} />
        <Stack.Screen name="AtentionOpen" component={AtentionRequestOpen}  options={{headerShown:false}} />
        

      </Stack.Navigator>

  );
};
export default AtentionNurseNav;