import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { stylesComplaint } from '../../Styles/ComplaintStyle.js';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import DataServiceRequestUser from '../../Data/DataServiceRequestUser.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserComplaint = () => {
  
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
        Alert.alert("Resgistrado","Se registró su queja. El administrador la verá pronto");

        n.replace("UserHome");
      }
      else{
        Alert.alert("Error","Contáctese con los desarrolladores");

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
        multiline
        style={stylesComplaint.input}
      />

      <View style={stylesComplaint.buttonContainer}>
        <TouchableOpacity  style={stylesNurse.btnAccept} onPress={async()=>{await registerAll()}}><Text style={{fontWeight:"bold", textAlign:"center", fontSize:18}}  >Registrar</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>{}} style={stylesNurse.btnRemove} ><Text style={{fontWeight:"bold", textAlign:"center", fontSize:18, color:"white"}}>Cancelar</Text></TouchableOpacity>
      </View>
    </View>
  );
};



export default UserComplaint;
