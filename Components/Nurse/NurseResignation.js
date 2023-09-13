import React, { useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import {Ionicons, FontAwesome} from '@expo/vector-icons';

import ResignationData from '../../Data/SubmitResignationRequest.js'





const NurseResignationScreen = () => {
    
    
    //-----INSTANCIA-------\\
    const resignationData = new ResignationData();

    //----------------------------ESTADOS--------------------------------\\

    const [nurseName, setNurseName] = useState('');

    const [reason, setReason] = useState('');

    //-----------------Envia el motivo de la renuncia a la base de datos---------------------\\
    const handleRequestResignation = async () => {
        try {
          if (!nurseName || !reason) {
            throw new Error('Por favor, ingresa un nombre y un motivo válidos');
          }
      
          const response = await resignationData.submitResignation(nurseName, reason);
          Alert.alert(response);
          setNurseName('');
          setReason('');
        } catch (error) {
          Alert.alert('Error al enviar la solicitud de renuncia. Por favor, inténtalo de nuevo.');
        }
      };
      

    return (
        <View style = {stylesNurse.container3}>
           <View style = {stylesNurse.container4}>
                <Text style={stylesNurse.texto}>Hello</Text>
                <Text style={stylesNurse.texto1}>Linda Valencia</Text>
                <Image
                    source={profile}
                    style = {stylesNurse.image}
                />               
           </View>
           <View style = {stylesNurse.container5}>
                <Text style = {stylesNurse.textTitle}>Solicitar Renuncia</Text>
                <ScrollView>
                    <Text style = {stylesNurse.textReaseonResignation}>Nombres</Text>
                    <TextInput
                         style={stylesNurse.inputNameResignation}
                         placeholder='Nombre'
                         value={nurseName}
                         onChangeText={(text) => setNurseName(text)}
                    />
                    <Text style = {stylesNurse.textReaseonResignation}>Motivo</Text>
                    <TextInput
                        style={stylesNurse.inputReasonResignation}
                        placeholder="Escribe tus motivos aqui"
                        multiline={true}
                        value={reason}
                        onChangeText={(text) => setReason(text)}
                    />
                </ScrollView>
                
                <TouchableOpacity onPress={handleRequestResignation} style={stylesNurse.btnRequest}>                    
                    <Text style={stylesNurse.btnTextRequest}>Solicitar</Text>
                </TouchableOpacity>
           </View>
        </View>
    )
}

export default NurseResignationScreen;