import React, { useEffect, useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import {Ionicons, FontAwesome} from '@expo/vector-icons';

import ResignationData from '../../Data/SubmitResignationRequest.js'

import AsyncStorage from '@react-native-async-storage/async-storage';


const NurseResignationScreen = () => {
    
  const [reason, setReason] = useState('');
  const [noshowDates, setShowDates] = useState(false);
  const[myuser, setuser] = useState("");
      var muser="";
  const getLocalUser =async()=>{
      if(noshowDates){
          setuser("");
              return;
      }
      try{
              muser = await AsyncStorage.getItem("user");
              let muserJson = muser? JSON.parse(muser): null;
              setuser(muserJson);
      }
      catch(e){
          console.error(e);
          setuser("");
      }
  }
  
  useEffect(()=>{
      getLocalUser();
  },[])
  const handleValidation = async () => {
    try {
      if (!reason) {
        Alert.alert('Por favor, ingresa un motivo válido');
        return;
      }

      const resignationData = new ResignationData();

      await resignationData.sendResignations({ reason });
      Alert.alert("EXITO!!", "Se envio su solicitud");
      setReason('');

    } catch (error) {
      Alert.alert('Error al enviar la solicitud de renuncia. Por favor, inténtalo de nuevo.');
    }
  };
 
    return (
        <View style = {stylesNurse.container3}>
           <View style = {stylesNurse.container4}>
                <Text style={stylesNurse.texto}>Hello</Text>
                <Text style={stylesNurse.texto1}>{myuser!=""? myuser.personRef.names+" "+ myuser.personRef.lastName :""}</Text>

                <Image
                    source={profile}
                    style = {stylesNurse.image}
                />               
           </View>
           <View style = {stylesNurse.container5}>
                <Text style = {stylesNurse.textTitle}>Solicitar Renuncia</Text>
                <ScrollView>
                    <Text style = {stylesNurse.textReaseonResignation}>Motivo</Text>
                    <TextInput
                        style={stylesNurse.inputReasonResignation}
                        placeholder="Escribe tus motivos aqui"
                        multiline={true}
                        //value= {reason}
                        onChangeText={(text) => setReason(text)}
                    />
                </ScrollView>
                
                <TouchableOpacity onPress={handleValidation} style={stylesNurse.btnRequest}>                    
                    <Text style={stylesNurse.btnTextRequest}>Solicitar</Text>
                </TouchableOpacity>
           </View>
        </View>
    )
}

export default NurseResignationScreen;