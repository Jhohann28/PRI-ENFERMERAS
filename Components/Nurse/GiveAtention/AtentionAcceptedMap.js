import  { useEffect, useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
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
import { getDatabase, ref, onValue } from '@firebase/database';
import * as geolib from "geolib";


const customIcon = require('../../../assets/images/Location/userIcon.gif');
const db = getFirestore(appFirebase);

const AtentionAcceptedMap = () => {

    const nav = useNavigation();
    const route = useRoute(); 
    const dataa = new NurseAtentionData();
    const {atention} = route.params;
    console.log(atention);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [locationUser, setLocationUser] = useState(null);
  


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

    useEffect(()=>{
        startLocationTracking();

    },[])
     
    const startLocationTracking = async () => {
        const { coords } = await Location.getCurrentPositionAsync({});
        console.log('Ubicación actual:', coords);
      
        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation, 
            timeInterval: 10000, 
            distanceInterval: 3, 
          },
           (location) => {
            console.log('Nueva ubicación:', location.coords);
             dataa.writeLocationNurse(location.coords,atention.id )
            setLocation(location);
          }
        );
      };


      //#region EScucha cliente
      const db = getDatabase(appFirebase);
      const starCountRef = ref(db, 'locations/' + atention.id + '/userLocation');
      
      
      
      useEffect(()=>{
        const onDataChange = (snapshot) => {
            try {
                const lt = snapshot.val();
                 setLocationUser(lt);
    
                
            } catch (error) {
                
            }
           
          };
      onValue(starCountRef, onDataChange);

      },[])
//#endregion

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

       
    const changeStateToNotFound=async ()=>{
      if(  geolib.getDistance(location.coords, locationUser)>32){
        console.log("NO SE PUEDE CAMBIAR EL ESTADO, distancia: "+ geolib.getDistance(location.coords, locationUser));
        Alert.alert(
            'No disponible',
            'Debe estar cerca de la última ubicación del usuario para cambiar de estado'
       )
        }
        let j = new NurseAtentionData();
        await j.UserNotFound(atention.id);
        nav.replace('NurseHome'); //A HOME
        
    }
    const changeStateToFound=async ()=>{
        if(  geolib.getDistance(location.coords, locationUser)>80){
          console.log("NO SE PUEDE CAMBIAR EL ESTADO, distancia: "+ geolib.getDistance(location.coords, locationUser));
          Alert.alert(
            'No disponible',
            'Debe estar cerca de la última ubicación del usuario para cambiar de estado'
       )
          return;
          }
          let j = new NurseAtentionData();
          await j.UserFound(atention.id, myuser.userAuthID, location.coords.latitude, location.coords.longitude);
          dataa.writeLocationNurse({latitude:-1000,longitude:-1000},atention.id )
          nav.replace('AtentionForm',{atention:atention}); 
          //redireccionar cuando s integre
          
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
                  { locationUser != null? <Marker
                        coordinate={{
                            latitude: locationUser.latitude, 
                            longitude: locationUser.longitude, 
                        }}
                        title="Ubicación de la persona"
                        description="Descripción de la ubicación de la persona"
               
                
                        >
                        <Image source={customIcon} style={{width:30, height:50}}></Image>

                        </Marker>:""}
              
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
                        {location!=null && locationUser!=null ?  <MapViewDirections
                            origin={location.coords}
                            destination={locationUser}
                            apikey="AIzaSyA_ls_slrYWqP45l0ROO3i5s2CgUmgcefk" // Reemplaza con tu clave de API de Google Maps
                            strokeWidth={3}
                            strokeColor="#0000FF"
                            
                            >

                            </MapViewDirections>:""} 
                        
                </MapView>
            </View>
             
            <ScrollView style={styles.myScroll}>
                <View style={styles.MyCont}>
                 

                    <Text style={styles.TextBodyA}>El paciente esta esperándote!!    </Text>
                    <Text style={styles.TextBody}>Solicitud Aceptada</Text>
                    <Text style={styles.TextBody}>Cambia el estado de la solicitud sólo cuando estés cerca.</Text>
                   
                    <View style={styles.horizontal} >
                <TouchableOpacity style={styles.btnAccept} onPress={async()=>await changeStateToFound()}>
                                      <Text style={{textAlign:"center", fontWeight:"bold", fontSize:18, justifyContent:"center", alignItems:"center"}} >En atención</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.btnRemove} onPress={async()=>await changeStateToNotFound()}>
                                      <Text  style={{textAlign:"center", fontWeight:"bold", fontSize:18, color:"white"}}   >Usuario no encontrado</Text>
                                  </TouchableOpacity>
                </View>
                </View>
                
            </ScrollView>
        </View>

    )
}
// apikey="AIzaSyBgmYM83-TooUkEELOLCd6uZE6I_bDz59M"
export default AtentionAcceptedMap;