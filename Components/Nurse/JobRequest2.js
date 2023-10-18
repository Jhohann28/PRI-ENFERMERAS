import React, { useEffect, useState } from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NurseScreen = () => {
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
    })

    return (
        <View style = {stylesNurse.container}>
           <View style = {stylesNurse.container2}>

                <Text style={stylesNurse.texto}>Bienvenido </Text>
                <Text style={stylesNurse.texto1}>{myuser!=""? myuser.personRef.names:""}</Text>
                <Image
                    source={profile}
                    style = {stylesNurse.image}
                />
                <TextInput
                    style = {stylesNurse.inputSearch}
                    placeholder='Buscar ofertas en el area'                   
                />
                <Ionicons name="search" size={30} color="black" style ={stylesNurse.iconSearch}/>
                <Text style={stylesNurse.texto2}>Ofertas</Text>
                <Text style={stylesNurse.texto3}>Tiquipaya</Text>
           </View>
           <Text style={stylesNurse.MessageText}>No hay ofertas</Text>
        </View>

    )
}

export default NurseScreen;