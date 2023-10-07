import React, { useEffect } from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartPage from '../StartPage';
import Loggin from '../Login';
import UserHomeInterface from "../../User/UserHomeInterface"
import AdminHomeInterface from "../../Administrator/AdminHomeInterface"
import NurseHome from "../../Nurse/NurseHome"
import AdminNavigation from "../../../Navigations/AdministratorNavigation/Navigation.js";
import UserNavigation from "../../../Navigations/UserNavigation/Navigation";
import NurseNavigation from "../../../Navigations/NurseNavigation/Navigation";
import JobRequest from '../JobRequest';
import UserForm from '../../User/UserRegistration';
import AtentionAcceptedMap from '../../Nurse/GiveAtention/AtentionAcceptedMap';
//import JobRequest from '../../Nurse/JobRequest';


const Stack = createStackNavigator();

const StartNavigator = () => {


  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="StartPage">
        <Stack.Screen name="Loggin" component={Loggin}  options={{headerShown:false}} />
        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown:false}}/>
        <Stack.Screen name="AdminHome" component={AdminNavigation} options={{headerShown:false}}/>
        <Stack.Screen name="UserHome" component={UserNavigation} options={{headerShown:false}}/>
        <Stack.Screen name="NurseHome" component={NurseNavigation} options={{headerShown:false}}/>
        <Stack.Screen name="JobRequest" component={JobRequest} options={{headerShown:false}}/>
        <Stack.Screen name="UserForm" component={UserForm} options={{headerShown:false}}/>
        <Stack.Screen name='AtentionOK' component={AtentionAcceptedMap} options={{headerShown:false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StartNavigator;
