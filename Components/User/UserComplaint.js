import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator,Modal } from 'react-native';
import { stylesComplaint } from '../../Styles/ComplaintStyle.js';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import DataServiceRequestUser from '../../Data/DataServiceRequestUser.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesAdmin } from '../../Styles/AdminStyles.js';

const UserComplaint = () => {
  
  
  
  const [modalVisible, setModalVisible] = useState(false);

  const n = useNavigation();
  const r = useRoute();

  const {idAtention} = r.params;
  const [description, setDescription] = useState('');

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
  const registerAll = async () => {
   setModalVisible(true);
    if (description.trim() === '' || description.trim().length <4 ) {
      Alert.alert('Error', 'La descripción debe tener 4 caracteres como mínimo');
    }
     else {
      let dt = new DataServiceRequestUser();
      let data = {
        id: idAtention,
        description: description
      }
      let res = await dt.registerComplaint(data,myuser.personRef.names+" "+myuser.personRef.lastName );
      if(res == true){
        Alert.alert("Registrado","Se registró su queja. El administrador la verá pronto");

        n.replace("UserHome");
   setModalVisible(false);

      }
      else{
        Alert.alert("Error","Contáctese con los desarrolladores");
        setModalVisible(false);

      }
    }
  };

  return (
    <View style={stylesComplaint.container}>
      <Text style={stylesComplaint.label}>Describa de forma detallada su queja:</Text>
      <TextInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Ingrese la descripción"
      
        style={stylesComplaint.input}
        returnKeyType="done"
      />

      <View style={stylesComplaint.buttonContainer}>
        {
          modalVisible?
          <ActivityIndicator size={53} color="blue" style={{alignSelf:"center"}}></ActivityIndicator>
     
          :
          <>
           <TouchableOpacity  style={stylesNurse.btnAccept} onPress={async()=>{await registerAll()}}><Text style={{fontWeight:"bold", textAlign:"center", fontSize:18}}  >Registrar</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>{}} style={stylesNurse.btnRemove} ><Text style={{fontWeight:"bold", textAlign:"center", fontSize:18, color:"white"}}>Cancelar</Text></TouchableOpacity>
          </>
        }

       
      </View>
    </View>
  );
};



export default UserComplaint;
