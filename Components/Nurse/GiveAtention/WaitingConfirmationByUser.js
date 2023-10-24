import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../../Styles/StartPageStyles.js';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import appFirebase from '../../../Data/firebaseConfig.js';
const db= getFirestore(appFirebase);
export default function WaitingConfirmationByUser() {

  
    const n = useNavigation();
    const r = useRoute();

    const {atention} =r.params;


    const susc = async () => {
        try {
            const unsub = onSnapshot(doc(db, "Atention", atention.id), (doc) => {
                console.log("Current data: ", doc.data());
                if(doc.data().status==1){
                   
                    Alert.alert("Confirmado", "Finalizó la atención");
                    n.replace('NurseHome'); 
                } 
            });
        } catch (error) {
            console.log(error);
        }
      };
      
      useEffect(() => {
        susc();
      }, []);
  
   
        
       
        
          
        
        useEffect(()=>{
           // getLocalUser();

        },[])



    return (
        <>
        <View style={styles.container}>
            <View style={styles.startHeader}>
                <Text style={styles.headerText} >Esperando Confirmación</Text>
            </View>
            <ScrollView style={styles.myScroll} >
                
            <Text style={{fontWeight:"bold", fontSize:21, textAlign:"center", color:"#0D47a1", margin:10}}>Comunique al usuario que confirme y califique la atención para completar todo el proceso</Text>
            <ActivityIndicator size={67} color="#0D47a1" style={{margin:20}} ></ActivityIndicator>
            
            <Image source={require("../../../assets/images/GeneralImages/client.png")} style={{width:360, height:260, alignSelf:"center"}}></Image>
            <Text style={{fontWeight:"bold", fontSize:21, textAlign:"center", color:"#0D47a1", margin:10}}>No debe abandonar la pantalla actual</Text>
            </ScrollView>
           


        </View>
         <View style={styles.startFooter}>
         <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
     </View></>

    );
}