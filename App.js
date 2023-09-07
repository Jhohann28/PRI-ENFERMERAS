import { StatusBar } from 'expo-status-bar';
import { RefreshControlComponent, StyleSheet, Text, View } from 'react-native';
import {appFirebase } from "./Data/firebaseConfig.js"
import Home from './Components/User/UserHomeInterface.js';
import NurseScreen from './Components/Nurse/NurseHome.js';
import AdminScreen from './Components/Administrator/AdminHomeInterface.js';
import MyStatusBar from './Components/General/ComponentsTools/myStatus.js'


export default function App() {
  return (
   
    <>
     <MyStatusBar></MyStatusBar>
     
     <Home></Home>
    </>
    /*Interfaces para mostrar 3*/
    
    /*<Home></Home>*/
    /*<NurseScreen></NurseScreen>  */
    /*<AdminScreen></AdminScreen>*/
     
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
