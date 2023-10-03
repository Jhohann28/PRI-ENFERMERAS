import React, {useState} from 'react'
import {Text,TextInput,TouchableOpacity } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { Claimstyles } from '../../Styles/DescriptionClaimStyles';


const DescriptionClaim = () => {
  
  return (
      <LinearGradient colors={['#1e0039','#604d9e','#a27eb8','#aaa2d8']} style={Claimstyles.gradi}>
         <Text style={Claimstyles.title}>Descripcion</Text>
         <TextInput style={Claimstyles.des} placeholder='Ingrese su queja' multiline={true} textAlignVertical='top'>
            
         </TextInput>
         
         <TouchableOpacity style={Claimstyles.buttonStyleR}>
          <Text style={Claimstyles.buttonText}>Enviar</Text>
         </TouchableOpacity>

      </LinearGradient>

      
  );
}; export default DescriptionClaim;