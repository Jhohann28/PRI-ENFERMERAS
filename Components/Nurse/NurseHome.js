import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import {Ionicons, FontAwesome} from '@expo/vector-icons';

const NurseScreen = () => {
    return (
        <View style = {stylesNurse.container}>
           <View style = {stylesNurse.container2}>

                <Text style={stylesNurse.texto}>Hello</Text>
                <Text style={stylesNurse.texto1}>Linda Valencia</Text>
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