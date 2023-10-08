import React , { useEffect, useState }from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import logo from '../../assets/images/GeneralImages/logo.png'
import {Ionicons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ServicesList from './ListofServices.js';
import { useNavigation, useRoute } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import DataAtentionsAdmin from '../../Data/DataAtentionsAdmin.js';
import { TextInput } from 'react-native-gesture-handler';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import DataAdminServiceRequest from '../../Data/DataAdminServiceRequest.js';
import firebase from 'firebase/app';
import appFirebase  from "../../Data/firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot, orderBy} from "firebase/firestore";
import MapMaker from '../../Tools/Maper.js';
import MapView, { Marker } from 'react-native-maps';
import styles from '../../Styles/AtentionRequestOpenStyles.js';
const customIcon = require('../../assets/images/Location/userIcon.gif');

const db = getFirestore(appFirebase);
const AtentionRequestOpenAdmin = () => {
    
    const nav = useNavigation();
    const route = useRoute(); 
    const {atention} = route.params;

    const [loading, setLoading] = useState(false);
    const[myuser, setuser] = useState("");
    const[requests, SetRequests]= useState([]);
        var muser="";

              
    const getLocalUser =async()=>{
        
        try{
                muser = await AsyncStorage.getItem("user");
                let muserJson = muser? JSON.parse(muser): null;
                setuser(muserJson);
        }
        catch(e){
            console.error(e);
            setuser("");
        }
    }

  



    useEffect(()=>{
        getLocalUser();
       
    },[])
  
 

    return (
        <View style = {stylesAdmin.container}>
              <View style = {stylesAdmin.container22}>
                <Text style={stylesAdmin.texto}>Solicitudes de Atención</Text>
                <Text style={stylesAdmin.texto1}>{myuser!=""? myuser.personRef.names:""}</Text>
                <Ionicons name="ios-person-circle-outline" size={74} color="white" style={stylesAdmin.image} />
                  <View style = {stylesAdmin.container4}>
                <View style={stylesNurse.containerHorizontal}>
                    <Text style={stylesAdmin.textCorporationTitle}>SISEEM</Text>
                    <Image
                        source={logo}
                    style={{width:70, height:70, alignSelf:"flex-end", marginLeft:120}}
                    />
                </View>
              
                 
        
               
            </View>
            </View>
            <View style = {styles.container7}>
            <View style={styles.myMapContainer2}>
                
            <MapView
                style={styles.MyMap}
                initialRegion={{
                    latitude: atention.userRef.location.latitude,
                    longitude: atention.userRef.location.longitude,
                    latitudeDelta: 0.0041022,
                    longitudeDelta: 0.00421,
                }}
               
                >
                 
                <Marker
                        coordinate={{
                            latitude: atention.userRef.location.latitude, 
                            longitude: atention.userRef.location.longitude, 
                        }}
                        title="Ubicación de la persona"
                        description="Descripción de la ubicación de la persona"
               
               
                        >
                        <Image source={customIcon} style={{width:30, height:50}}></Image>
                            
                        </Marker>
                        
                          
                        
                </MapView>
            </View>
            <ScrollView style={styles.myScroll}>
                <View style={styles.MyCont}>
                 

                    <Text style={styles.TextBodyA}>Descripción:    ( {atention.serviceRef.price} Bs. )</Text>
                    <Text style={styles.TextBody}>{atention.description}</Text>
                    {atention.imageUrl != ""? 
                    <Image source={{uri: atention.imageUrl}} style={styles.MyImg}></Image>
                    :<Text></Text>
                
                    }
                 
                </View>
                
            </ScrollView>



           </View>
        </View>
    )
}
export default AtentionRequestOpenAdmin;