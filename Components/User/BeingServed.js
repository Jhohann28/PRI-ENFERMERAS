import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button, TouchableHighlight, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../Styles/StartPageStyles.js';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DataUser from '../../Data/DataUser.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onSnapshot , doc, getFirestore} from 'firebase/firestore';
import appFirebase from '../../Data/firebaseConfig.js';

const db= getFirestore(appFirebase);
export default function BeingServed() {

    const n = useNavigation();
    const r = useRoute();

    const {idAtention} =r.params;


    const susc = async () => {
        try {
            const unsub = onSnapshot(doc(db, "Atention", idAtention), (doc) => {
                console.log("Current data: ", doc.data());
                if(doc.data().status==2){
                    let mdata ={
                            id: idAtention,
                            aditionalCost: doc.data().aditionalCost,
                            serviceCurrentCost: doc.data().serviceCurrentCost
                    }
                    n.replace('Calification',{Atention:mdata}); 
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
                <Text style={styles.headerText} >En Atención</Text>
            </View>
            <ScrollView style={styles.myScroll} >
                
            <Text style={{fontWeight:"bold", fontSize:21, textAlign:"center", color:"#0D47a1", margin:10}}>El enfermero ya se encuentra realizando la atención. Espere a que termine para confirmar</Text>
            <ActivityIndicator size={67} color="#0D47a1" style={{margin:20}} ></ActivityIndicator>
            
            <Image source={require("../../assets/images/GeneralImages/nurse.png")} style={{width:120, height:300, alignSelf:"center"}}></Image>
            <Text style={{fontWeight:"bold", fontSize:21, textAlign:"center", color:"#0D47a1", margin:10}}>No debe abandonar la pantalla actual</Text>
            </ScrollView>
           


        </View>
         <View style={styles.startFooter}>
         <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
     </View></>

    );
}