import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput , ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../Styles/StartPageStyles.js';
import * as ownStyles from "../../Styles/LoginStyles.js"
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import {appFirebase } from "../../Data/firebaseConfig.js";
import { useNavigation } from '@react-navigation/native';

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google.js";
import { GoogleAuthProvider,onAuthStateChanged, signInWithCredential, getAuth } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as DocumentPicker from 'expo-document-picker';
import DataJobRequest from '../../Data/DataJobRequest.js';
export default function JobRequest() {
  
    const[uri, seturi] = useState("");
    const[names, setname] = useState("");

  const nav = useNavigation();
    var Uri = "";
    var Name = "";
  const route = useRoute(); 
  const pickDocument = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
        if (!result.canceled) {
            console.log(result.assets[0].uri);
            Uri = result.assets[0].uri;
            Name=  result.assets[0].name;
            setname(Name);
            seturi(Uri);
        } else {
            console.log("nada che");

        }
        console.log(Name);
      } catch (error) {
        console.error('Error al seleccionar el archivo:', error);
      }
  };
 useEffect(()=>{ setname(Name)}, [Uri])
  
  
  
  

    const LoadFiles= async()=>{
        let dataJobr = new DataJobRequest();
        dataJobr.uploadFiles(names,uri); //ya da siuu
    }

    return (
      <>
      <View style={styles.container}>
      <View style={styles.startHeader}>
          <Text style={styles.headerText} >Solicitud de Trabajo</Text>
      </View>
      <ScrollView style={styles.myScroll} >
          <View style={styles.container}>
              <TouchableOpacity onPress={()=>{pickDocument(); seturi(Uri)}}><Text>{names!= ""? names:"Subir curriculum..."} </Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>{LoadFiles()}}><Text>Cargar </Text></TouchableOpacity>

          </View>


      </ScrollView>
     


  </View>
   <View style={styles.startFooter}>
   <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
</View></>
    );
}
