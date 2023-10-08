import  { useEffect, useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { stylesNurse } from '../../../Styles/NurseStyles.js';
import {Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import DataNurse from '../../../Data/DataNurse.js';
import  styles  from '../../../Styles/AtentionRequestOpenStyles.js';
import firebase from 'firebase/app';
import appFirebase  from "../../../Data/firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot} from "firebase/firestore";
import MapView, {Marker} from "react-native-maps";
import { useNavigation, useRoute } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import NurseAtentionData from '../../../Data/NurseAtentionData.js';

const customIcon = require('../../../assets/images/Location/userIcon.gif');
const db = getFirestore(appFirebase);

const AtentionRequestOpen = () => {

    const nav = useNavigation();
    const route = useRoute(); 
    const {atention} = route.params;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          nav.replace("HomeNurse");
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setLocation(location);
      })();
    }, []);


     
        console.log(atention);

    const dtN = new DataNurse();

    const[myuser, setuser] = useState("");
        var muser="";
    const getLocalUser =async()=>{

        try{
                muser = await AsyncStorage.getItem("user");
                let muserJson = muser? JSON.parse(muser): null;
                setuser(muserJson);
        }
        catch(e){
            console.error(e);
        }
    }
    useEffect(()=>{
        getLocalUser();
    },[])

        GoToMainAtent=async()=>{
            let n = new NurseAtentionData();
           if(await n.IsStillDisponible(atention)) {
            nav.replace("AtentionOK",{atention: atention});
           }
           else{
            console.log("YA NO ESTA DISPONIBLE");
           }
       }
    
    return (
        <View style = {styles.container}>
            <View style={styles.myMapContainer}>
            <MapView
                style={styles.MyMap}
                initialRegion={{
                    latitude: atention.userRef.location.latitude,
                    longitude: atention.userRef.location.longitude,
                    latitudeDelta: 0.0041022,
                    longitudeDelta: 0.00421,
                }}
               
                >
                  { location != null? <Marker
                        coordinate={{
                            latitude: location.coords.latitude, 
                            longitude: location.coords.longitude, 
                        }}
                        title="Ubicación de la persona"
                        description="Descripción de la ubicación de la persona"
               
                
                        >
                        <Image source={customIcon} style={{width:30, height:50}}></Image>

                        </Marker>:""}
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
                        {location!=null?  <MapViewDirections
                            origin={location.coords}
                            destination={atention.userRef.location}
                          //  apikey="AIzaSyAwM90zqo1GBuXDpnqTS2-bzA9Y0aiUBmQ" // Reemplaza con tu clave de API de Google Maps
                            strokeWidth={3}
                            strokeColor="#0000FF"
                            
                            >

                            </MapViewDirections>:""}
                          
                        
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
                    <View style={styles.horizontal} >
                <TouchableOpacity style={styles.btnAccept}>
                                      <Text style={{textAlign:"center", fontWeight:"bold", fontSize:18}} onPress={()=>GoToMainAtent(atention)}>Aceptar</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.btnRemove}>
                                      <Text  style={{textAlign:"center", fontWeight:"bold", fontSize:18, color:"white"}}  onPress={()=>nav.replace("NurseHome")} >Cerrar</Text>
                                  </TouchableOpacity>
                </View>
                </View>
                
            </ScrollView>
        </View>

    )
}

export default AtentionRequestOpen;