import { StatusBar } from 'expo-status-bar';
     
import {RefreshControlComponent, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {appFirebase } from "./Data/firebaseConfig.js"
import Loggin from './Components/General/Login.js';
import MyStatusBar from './Components/General/ComponentsTools/myStatus.js';
import StartPage from './Components/General/StartPage.js';
import StartNavigator from './Components/General/Navigators/StartNavigator.js';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
   
    <>
      <MyStatusBar></MyStatusBar>
  <StartNavigator></StartNavigator>
    </>
    /*Interfaces para mostrar 3*/
    
    /*<Home></Home>*/
    /*<UserNavigation></UserNavigation>*/
    /*<NurseScreen></NurseScreen>*/
    /*<NurseNavigation></NurseNavigation>*/
    /*<AdminScreen></AdminScreen>*/
    /*<AdminNavigation></AdminNavigation>*/
    


  )};
