import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { stylesExpanded } from '../../Styles/ExpandedJobListStyles.js';
import DataJobRequest from '../../Data/DataJobRequest.js';
import JobRequest from '../General/JobRequest.js';
const ExpandedJob = () => {
  const solicitudes = [
    { id: '1', nombre: 'Nombre:', egresado: 'Egresado de:', especialidad: 'Especialidad:' },
    { id: '1', nombre: 'Nombre:', egresado: 'Egresado de:', especialidad: 'Especialidad:' },
    // ... más datos
  ]; 
   

  const contactarHandler = (solicitudId) => {
    console.log(`Contactar a la solicitud con ID: ${solicitudId}`);
  };

  const ampliarHandler = (solicitudId) => {
    console.log(`Ampliar la solicitud con ID: ${solicitudId}`);
  };

  const rechazarHandler = (solicitudId) => {
    console.log(`Rechazar la solicitud con ID: ${solicitudId}`);
  };

  

  return (
    <View style={stylesExpanded.outerContainer}>
     
        <View style={stylesExpanded.itemContainer}>
      <View style={[stylesExpanded.itemInnerContainer, { backgroundColor: '#9FC4EF', borderRadius: 10 }]}>
        <View style={stylesExpanded.itemDetails}>
          
          <Text style={stylesExpanded.itemText}>Nombre: {}</Text>
          <Text style={stylesExpanded.itemText}>Apellido Paterno: {}</Text>
          <Text style={stylesExpanded.itemText}>Apellido Materno: {}</Text>
          <Text style={stylesExpanded.itemText}>Egresado de: {}</Text>
          <Text style={stylesExpanded.itemText}>Fecha de egresado: {}</Text>
          <Text style={stylesExpanded.itemText}>Especialidad: {}</Text>
          <Text style={stylesExpanded.itemText}>Ci: {}</Text>
          <Text style={stylesExpanded.itemText}>Email: {}</Text>
          <Text style={stylesExpanded.itemText}>Teléfono: {}</Text>
          <Text style={stylesExpanded.itemText}>Curriculum Adjunto: {}</Text>
        </View>
      </View>
      <View style={stylesExpanded.buttonsContainer}>
        <TouchableOpacity style={[stylesExpanded.button, { backgroundColor: '#009B35' }]} onPress={() => contactarHandler()}>
          <Text style={stylesExpanded.buttonText}>Dar de Alta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesExpanded.button, { backgroundColor: '#56D782', marginLeft: 10, marginRight: 10 }]} onPress={() => ampliarHandler()}>
          <Text style={stylesExpanded.buttonText}>Contactar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesExpanded.button, { backgroundColor: 'red' }]} onPress={() => rechazarHandler()}>
          <Text style={stylesExpanded.buttonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    </View>
      
      
    </View>
  );
};



export default ExpandedJob;
