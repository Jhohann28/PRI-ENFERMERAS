import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator,  Animated, Easing } from 'react-native';
import { stylesServiceRequestUser } from '../../Styles/stylesServiceRequestUser'; // Debería ser 'style', no 'Styles'
import {ServiceWaitRequestUserStyle} from '../../Styles/UserWaitRequestStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import DataUser from "../../Data/DataUser.js";
import {Picker} from '@react-native-picker/picker';
import LoadImage from '../../Tools/LoadImageUserRequest.js';
import DataServices from '../../Data/DataServices'; 
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";


const WaitForAttention = () => {

    const n = useNavigation();
    

    return(
        <View style={ServiceWaitRequestUserStyle.container}>

              <View style={ServiceWaitRequestUserStyle.container2}>
                <Text style={ServiceWaitRequestUserStyle.texto}>Hola</Text>
                <Text style={ServiceWaitRequestUserStyle.texto1}>Linda Valencia</Text>
                <Image
                    source={profile}
                    style = {ServiceWaitRequestUserStyle.image}
                />
               
            </View>
            <View style={ServiceWaitRequestUserStyle.container3}>
                <Text style={ServiceWaitRequestUserStyle.texto2}>Su solicitud a sido enviada a nuestro equipo de enferme@s.</Text>
                <Text  style={ServiceWaitRequestUserStyle.texto2}>Aguarde que la misma sea aceptada.</Text>

                <ActivityIndicator size="large" color="#00ff00" style = {ServiceWaitRequestUserStyle.loadIndicator}/>
                <TouchableOpacity 
                    style = {ServiceWaitRequestUserStyle.btnCancelarSolicitud}
                    onPress={() => n.navigate("ServiceRequestUser")} 
                    >
                    <Text style = {ServiceWaitRequestUserStyle.btnTexto}>Cancelar Solicitud</Text>
                </TouchableOpacity>


            </View>
           
        </View>
    )
}
export default WaitForAttention;
