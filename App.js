import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {appFirebase } from "./Data/firebaseConfig.js"
import Loggin from './Components/General/Login.js';
import MyStatusBar from './Components/General/ComponentsTools/myStatus.js';
import StartPage from './Components/General/StartPage.js';

export default function App() {
  return (
<>
<MyStatusBar></MyStatusBar>
      <StartPage></StartPage>
</>
  
    
  );
}


