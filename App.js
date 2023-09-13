import { StatusBar } from 'expo-status-bar';
import { RefreshControlComponent, StyleSheet, Text, View } from 'react-native';
import {appFirebase } from "./Data/firebaseConfig.js"
import Home from './Components/User/UserHomeInterface.js';
import NurseScreen from './Components/Nurse/NurseHome.js';
import AdminScreen from './Components/Administrator/AdminHomeInterface.js';
import MyStatusBar from './Components/General/ComponentsTools/myStatus.js'
import Navigation from "./Navigations/NurseNavigation/Navigation.js"
import NurseNavigation from './Navigations/NurseNavigation/Navigation.js';
import UserNavigation from './Navigations/UserNavigation/Navigation.js';
import AdminNavigation from './Navigations/AdministratorNavigation/Navigation.js';
import NurseResignationScreen from './Components/Nurse/NurseResignation.js';


export default function App() {
  return (
   
    <>
     <MyStatusBar></MyStatusBar>
    
     <NurseNavigation></NurseNavigation>
    </>
    /*Interfaces para mostrar 3*/
    
    /*<Home></Home>*/
    /*<UserNavigation></UserNavigation>*/
    /*<NurseScreen></NurseScreen>*/
    /*<NurseNavigation></NurseNavigation>*/
    /*<NurseResignationScreen></NurseResignationScreen>*/
    /*<AdminScreen></AdminScreen>*/
    /*<AdminNavigation></AdminNavigation>*/
    
     
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
