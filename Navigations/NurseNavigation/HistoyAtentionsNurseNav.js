import React, { useEffect } from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NurseHome from "../../Components/Nurse/NurseHome"
import AtentionRequestOpen from '../../Components/Nurse/GiveAtention/AtentionRequestOpen';
import HistoryAtentionNurse from '../../Components/Nurse/HistoryAtentionNurse/HistoryAtentionNurse';
import MyAtentionNurseOpen from '../../Components/Nurse/HistoryAtentionNurse/MyAtentionNurseOpen';

const Stack = createStackNavigator();

const HistoyAtentionsNurseNav = () => {


  return (
    
      <Stack.Navigator initialRouteName="HistoryOfAtentions">
        <Stack.Screen name="HistoryOfAtentions" component={HistoryAtentionNurse}  options={{headerShown:false}} />
        <Stack.Screen name="MyAtentionNurseOpen" component={MyAtentionNurseOpen}  options={{headerShown:false}} />

      </Stack.Navigator>

  );
};
export default HistoyAtentionsNurseNav;