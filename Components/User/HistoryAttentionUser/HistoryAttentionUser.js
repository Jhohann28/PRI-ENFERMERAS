import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert, ScrollView, TextInput } from 'react-native';
import { styles } from '../../../Styles/UserStyles.js'; // Debería ser 'style', no 'Styles'
import profile from '../../../assets/images/GeneralImages/perfil.jpg';
import world from '../../../assets/images/GeneralImages/World.gif';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import appFirebase from '../../../Data/firebaseConfig.js';
import { useNavigation } from "@react-navigation/native";
import DataHistoryUser from "../../../Data/HistoryUser/DataHistoryUser.js";

import { stylesNurse } from '../../../Styles/NurseStyles.js';
MaterialCommunityIcons
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


const HistoryAttentionUser = () => {

    const n = useNavigation();

    const [searchInput, setSearchInput] = useState("");


    const [myuser, setuser] = useState("");
    const [atentions, setAtentions] = useState([]);
    var muser = "";
    const getLocalUser = async () => {
        try {
            muser = await AsyncStorage.getItem("user");
            let muserJson = muser ? JSON.parse(muser) : null;
            setuser(muserJson);


        }
        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getLocalUser();
    }, [])

    useEffect(() => {
        GetListOfAtentions();
    }, [myuser])


    const OpenALot = (id) => {
        n.navigate("MyUserAtentionOpen", { atentionn: id })
    }
    const GetListOfAtentions = async () => {
        let r = new DataHistoryUser();
        let a = await r.getAtentionListFormattedByUser(myuser.userAuthID)
        setAtentions(a);
    }
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.texto}>Historial</Text>
                <MaterialIcons name="account-circle" size={74} color="white" style={styles.image} />
                <Text style={styles.texto2}>Historiales de atencion</Text>
                <TextInput
                    style={styles.search}
                    placeholder='Buscar'
                    onChangeText={(text) => setSearchInput(text)}
                    value={searchInput}
                >
                </TextInput>
                <Ionicons name="search" size={30} color="black" style={styles.iconSearchs} />
            </View>

            <ScrollView>

                {atentions.length > 0 ?


                    atentions.map((atention) => {
                        //a este map se le agrego la busqueda mediante todos los filtros
                        if (searchInput != "") {
                            if (!atention.nurseRef.names.includes(searchInput) && !atention.nurseRef.lastName.includes(searchInput) && !atention.date.includes(searchInput) && !atention.serviceRef.name.includes(searchInput) && atention.aditionalCost != searchInput && atention.serviceCurrentCost != searchInput && atention.aditionalCost + atention.serviceCurrentCost != searchInput && !atention.adress.includes(searchInput)) {
                                return;
                            }
                        }
                        return (

                            <View style={stylesNurse.myAtentionRequestItem} key={atention.id}>
                                <View style={stylesNurse.containerHorizontal}>
                                    <FontAwesome5 name="hospital-alt" size={44} color="black" />

                                    <View style={stylesNurse.containerHorizontal2}>


                                        <Text style={stylesNurse.left} >Enfermera: <Text style={{ fontWeight: "normal" }}>{atention.nurseRef.names + " " + atention.nurseRef.lastName}</Text></Text>
                                        <Text style={stylesNurse.left}>Servicio:  <Text style={{ fontWeight: "normal" }}>{atention.serviceRef.name}</Text></Text>


                                        <Text style={stylesNurse.left}>Total:  <Text style={{ fontWeight: "normal" }}>{atention.aditionalCost + atention.serviceCurrentCost} Bs.</Text></Text>
                                        <View style={stylesNurse.containerHorizontal}>
                                            <Text style={stylesNurse.left} >Precio servicio:  <Text style={{ fontWeight: "normal" }}>{atention.serviceCurrentCost} | </Text> </Text>
                                            <Text style={stylesNurse.left}>Adicional:  <Text style={{ fontWeight: "normal" }}> {atention.aditionalCost} </Text></Text>
                                        </View>

                                        <View style={stylesNurse.containerHorizontal}>

                                            <Text style={stylesNurse.left}>Dirección:  <Text style={{ fontWeight: "normal" }}>{atention.adress}</Text></Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={{ alignSelf: "center" }}><Text style={{ textAlign: "center" }} >Fecha: {atention.date}</Text></View>


                                <View style={stylesNurse.containerHorizontalButtons}>
                                    <TouchableOpacity style={stylesNurse.btnAccept2} onPress={() => OpenALot(atention)}>

                                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}>Ampliar</Text>

                                    </TouchableOpacity>
                                </View>

                            </View>
                        )
                    })

                    : <Text>No hay atenciones recibidas</Text>}

            </ScrollView>

            <TouchableOpacity onPress={() => GetListOfAtentions()}>
                <Text style={{ alignSelf: 'center', borderRadius: 10, padding: 10, width: '80%', textAlign: "center", backgroundColor: '#0B3068', color: '#ffffff' }}>Recargar</Text>
            </TouchableOpacity>
        </View>
    )

}
export default HistoryAttentionUser


