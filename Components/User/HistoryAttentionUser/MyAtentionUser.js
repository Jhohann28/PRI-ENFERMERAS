import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { styles } from '../../../Styles/UserStyles.js'; // Debería ser 'style', no 'Styles'
import profile from '../../../assets/images/GeneralImages/perfil.jpg';
import world from '../../../assets/images/GeneralImages/World.gif';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import appFirebase from '../../../Data/firebaseConfig.js';
import { useNavigation, useRoute } from "@react-navigation/native";
import DataHistoryUser from "../../../Data/HistoryUser/DataHistoryUser.js";

import { stylesNurse } from '../../../Styles/NurseStyles.js';
MaterialCommunityIcons
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


const MyAtentionUserOpen = () => {
   
    const n = useNavigation();
    const r = useRoute();
    const {atentionn} = r.params

    console.log(atentionn);

    const[myuser, setuser] = useState("");
    const [atentions, setAtentions] = useState(null);
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

    const GetListOfAtentions = async ()=>{
        let r = new DataHistoryUser();
        let a = await r.getAtentionListFormattedByUser(myuser.userAuthID)
        setAtentions(a);
    }
    return(
        <View style={styles.container}> 
            <View style={styles.container2}>
                <Text style={styles.texto}>Historial</Text>
                
                <Image
                    source={profile}
                    style = {styles.image}
                />
                <Text style={styles.texto2}>Historiales de atencion</Text>
            </View>
           <ScrollView style={styles.scrollDetail}>
             
                <Text style={styles.textScroll}>Enfermera: <Text style={{fontWeight: "normal"}}>{atentionn.nurseRef.names + " " + atentionn.nurseRef.lastName}</Text> </Text>
                <Text style={styles.textScroll}>Costo: <Text style={{fontWeight: "normal"}}>{atentionn.aditionalCost + atentionn.serviceCurrentCost} Bs.</Text></Text>
                <Text style={styles.textScroll}>Costo Adicional: <Text style={{fontWeight: "normal"}}> {atentionn.aditionalCost } </Text></Text>              
                <Text style={styles.textScroll}>Servicio: <Text style={{fontWeight: "normal"}}>{atentionn.serviceRef.name}</Text></Text>
                <Text style={styles.textScroll}>Examen Fisico: <Text style = {{fontWeight: 'normal'}}>{atentionn.physicalTest}</Text></Text>
                <Text style={styles.textScroll}>Descripcion: <Text style = {{fontWeight: 'normal'}}>{atentionn.description}</Text></Text>
                <Text style={styles.textScroll}>Tratamiento: <Text style = {{fontWeight: 'normal'}}>{atentionn.treatment}</Text></Text>
                <Text style={styles.textScroll}>Direccion: <Text style = {{fontWeight: 'normal'}}>{atentionn.adress}</Text></Text>
                <Text style={styles.textScroll}>Fecha: <Text style = {{fontWeight: 'normal'}}>{atentionn.date}</Text></Text>
                <Text style={styles.textScroll}>Imagen de referencia: </Text>
                <Image
                    //style={{width: "50%", height:" 50%", backgroundColor: 'red'}}
                    style={styles.imgRef}
                    source= {{uri: atentionn.imageUrl}}
                />
           </ScrollView>   

           <TouchableOpacity onPress={() =>  n.navigate("HistoryAttentionUser")} style={styles.btnReload}>
                <Text style={styles.textReload}>Volver</Text>
           </TouchableOpacity>

        </View>
    )

}
export default MyAtentionUserOpen


