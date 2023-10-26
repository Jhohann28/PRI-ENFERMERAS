import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { styles } from '../../Styles/UserStyles.js'; // Debería ser 'style', no 'Styles'
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import world from '../../assets/images/GeneralImages/World.gif';
import world3 from '../../assets/images/GeneralImages/World3.gif';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DataUser from "../../Data/DataUser.js";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
   
    const n = useNavigation();

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
    }, [])


    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.container2}>
                    <Text style={styles.texto}>Bienvenido</Text>
                    <Text style={styles.texto1}>{myuser!=""? myuser.personRef.names+" "+myuser.personRef.lastName:""}</Text>
                    <MaterialIcons name="account-circle" size={74} color="white"  style = {styles.image} />
                    <Text style={styles.texto2}>Somos vida, somos parte de tí. Estamos en todas partes...</Text>
                </View>
                <Image
                    source={world3}
                    style={styles.worldBlue}
                />
                <TouchableOpacity 
                    onPress={() => n.navigate("ServiceRequestUser")} 
                    style = {styles.btnSolicitar}>
                    <Text style = {styles.btnTexto}>Solicitar</Text>         
                </TouchableOpacity>     
            </ScrollView>
        </View>
    )
}
export default Home


