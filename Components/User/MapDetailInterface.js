import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { UserMapStyle } from '../../Styles/UserMapStyles.js'; // Debería ser 'style', no 'Styles'
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DataUser from "../../Data/DataUser.js";
import { Picker } from '@react-native-picker/picker';
import LoadImage from '../../Tools/LoadImageUserRequest.js';
import DataServices from '../../Data/DataServices';
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from '../../Styles/UserStyles.js';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import DataServiceRequestUser from "../../Data/DataServiceRequestUser.js";
import Services from "../../Models/ServicesModel.js";
import MapViewDirections from 'react-native-maps-directions';
import { getDatabase, onValue, ref, set } from "firebase/database";
import appFirebase from "../../Data/firebaseConfig.js";
import DataMap from "../../Data/DataMap.js";



const db = getDatabase(appFirebase);



const DetailOfNurseOnTheWay = () => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nurseLocations, setNurseLocations] = useState(null);
  const n = useNavigation();
  const rut = useRoute();
  const { service } = rut.params;
  console.log(service);
  var myId = service;
  //esta parte pide permiso
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {

    startLocationTracking();

  }, [])

  const starCountRef = ref(db, 'locations/' + service + '/nurseLocation');

  useEffect(() => {

    const onDataChange = (snapshot) => {
      try {
        const lt = snapshot.val();
        if (snapshot.val().latitude == -1000) {
          n.replace('BeingServed',{idAtention:service}); 
          
        }
        setNurseLocations(lt);
      } catch (error) {

      }
    };

    onValue(starCountRef, onDataChange);

  }, [])

  const startLocationTracking = async () => {

    const { coords } = await Location.getCurrentPositionAsync({});

    console.log('Ubicación actual:', coords);


    const subscription = await Location.watchPositionAsync(

      {

        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 10000,
        distanceInterval: 3,

      },
      (locationn) => {

        var data = new DataMap();

        console.log('Nueva ubicación:', locationn.coords);
        data.writeLocationUser(locationn.coords, myId)
        setLocation(locationn.coords);
      }
    );
  };


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={UserMapStyle.container}>
      <View style={UserMapStyle.container3}>
        <MapView style={UserMapStyle.map} initialRegion={{ latitude: -17.38031006310289, longitude: -66.16033831408814, latitudeDelta: 0.0041022, longitudeDelta: 0.00421 }}>

          {nurseLocations != null ? <Marker
            coordinate={{

              latitude: nurseLocations.latitude,

              longitude: nurseLocations.longitude,

            }}

            title="Ubicación de la persona"

            description="Descripción de la ubicación de la persona"





          >



          </Marker> : ""}



          {location != null ? <Marker

            coordinate={{

              latitude: location.latitude,

              longitude: location.longitude,

            }}

            title="Ubicación de la persona"

            description="Descripción de la ubicación de la persona"





          >




          </Marker> : ""}

          {location != null && nurseLocations != null ? <MapViewDirections

            origin={location}

            destination={nurseLocations}

            //apikey="AIzaSyBgmYM83-TooUkEELOLCd6uZE6I_bDz59M" // Reemplaza con tu clave de API de Google Maps

            strokeWidth={3}

            strokeColor="#0000FF"

          >

          </MapViewDirections> : ""}


        </MapView>
      </View>
      <View style={UserMapStyle.container2}>
        <Text style={UserMapStyle.textTitleInfo}>Información</Text>
        <Text style={UserMapStyle.textInfo}>Su solicitud ha sido aceptada. Mire el mapa para ver el tiempo  que tardará el enfermero en llegar hasta usted</Text>
      </View>

    </View>
  )
}
export default DetailOfNurseOnTheWay;