import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { UserMapStyle } from '../../Styles/UserMapStyles.js'; // Debería ser 'style', no 'Styles'
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import DataUser from "../../Data/DataUser.js";
import {Picker} from '@react-native-picker/picker';
import LoadImage from '../../Tools/LoadImageUserRequest.js';
import DataServices from '../../Data/DataServices'; 
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../../Styles/UserStyles.js';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';


const DetailOfNurseOnTheWay = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    //esta parte pide permiso
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
    return(
        <View style={UserMapStyle.container}>
            <View style={UserMapStyle.container3}>
                <MapView style={UserMapStyle.map} />
            </View>
            <View style={UserMapStyle.container2}>
                <Text style={UserMapStyle.textTitleInfo}>Informacion</Text>
                <Text style={UserMapStyle.textInfo}>Su solicitud a sido aceptada por ............... Mire el mapa para ver el tiempo  que tarda el enfermero en llegar hasta usted</Text>
            </View>
            
        </View>

    )
}
export default DetailOfNurseOnTheWay;