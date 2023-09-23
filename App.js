import {GestureHandlerRootView} from "react-native-gesture-handler"
import { StatusBar } from 'expo-status-bar';
import {RefreshControlComponent, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {appFirebase } from "./Data/firebaseConfig.js"
import Loggin from './Components/General/Login.js';
import MyStatusBar from './Components/General/ComponentsTools/myStatus.js';
import StartPage from './Components/General/StartPage.js';
import StartNavigator from './Components/General/Navigators/StartNavigator.js';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataUser from "./Data/DataUser.js";
import { useRoute, useNavigation } from '@react-navigation/native';

export default function App() {

    
    return (
   
      <>
        <MyStatusBar></MyStatusBar>
    <StartNavigator></StartNavigator></>
    
    )
 
    /*Interfaces para mostrar 3*/
    
    /*<Home></Home>*/
    /*<UserNavigation></UserNavigation>*/
    /*<NurseScreen></NurseScreen>*/
    /*<NurseNavigation></NurseNavigation>*/
    /*<NurseResignationScreen></NurseResignationScreen>*/
    /*<AdminScreen></AdminScreen>*/
    /*<AdminNavigation></AdminNavigation>*/
    


  };
