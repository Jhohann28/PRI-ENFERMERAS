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
import JobDetails from '../../Components/Administrator/JobDetails';
import ExpandedJobList from '../../Components/Administrator/ExpandedJobList';




const Stack = createStackNavigator();


const JobRequestNav = () => {



  return (
    
      <Stack.Navigator initialRouteName="JobDetails">
        <Stack.Screen name="JobDetails" component={JobDetails}  options={{headerShown:false}} />

        <Stack.Screen name="ExpandedJobList" component={ExpandedJobList}  options={{headerShown:false}} />
      
        <Stack.Screen name="AdminScreen" component={AdminScreen}  options={{headerShown:false}} />
      </Stack.Navigator>

  );
};
export default JobRequestNav