import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { stylesDetails } from '../../Styles/JobDetailsStyle.js';
import DataJobRequest from '../../Data/DataJobRequest.js';
import JobRequest from '../General/JobRequest.js';
const ListaSolicitudes = () => {
  const solicitudes = [
    { id: '1', nombre: 'Nombre:', egresado: 'Egresado de:', especialidad: 'Especialidad:' },
    { id: '1', nombre: 'Nombre:', egresado: 'Egresado de:', especialidad: 'Especialidad:' },
    // ... más datos
  ]; 
  const [JobRequests,setJobRequest] = useState([]);
  
  
  const load =async () => {
  let d = new DataJobRequest();
  let aux = [];
  aux = await d.getJobRequest();
  setJobRequest(aux);
  console.log(JobRequests);
  };

  useEffect(()=>{
  load();
  },[]); 

  const contactarHandler = (solicitudId) => {
    console.log(`Contactar a la solicitud con ID: ${solicitudId}`);
  };

  const ampliarHandler = (solicitudId) => {
    console.log(`Ampliar la solicitud con ID: ${solicitudId}`);
  };

  const rechazarHandler = (solicitudId) => {
    console.log(`Rechazar la solicitud con ID: ${solicitudId}`);
  };

  const renderSolicitudContainer = ({ item }) => (
    <View style={stylesDetails.itemContainer}>
      <View style={[stylesDetails.itemInnerContainer, { backgroundColor: '#9FC4EF', borderRadius: 10 }]}>
        <View style={stylesDetails.itemDetails}>
          <Text style={stylesDetails.itemText}>{item.nombre}</Text>
          <Text style={stylesDetails.itemText}>{item.egresado}</Text>
          <Text style={stylesDetails.itemText}>{item.especialidad}</Text>
          <View style={stylesDetails.buttonsContainer}>
        <TouchableOpacity style={[stylesDetails.button, { backgroundColor: 'green' }]} onPress={() => contactarHandler(item.id)}>
          <Text style={stylesDetails.buttonText}>Contactar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesDetails.button, { backgroundColor: '#3498db', marginLeft: 10, marginRight: 10 }]} onPress={() => ampliarHandler(item.id)}>
          <Text style={stylesDetails.buttonText}>Ampliar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesDetails.button, { backgroundColor: 'red' }]} onPress={() => rechazarHandler(item.id)}>
          <Text style={stylesDetails.buttonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
        </View>
      </View>
      
    </View>
  );

  return (
    <View style={stylesDetails.outerContainer}>
      {JobRequests.length > 0?
      JobRequests.map((item)=>(
        <View style={stylesDetails.itemContainer}>
      <View style={[stylesDetails.itemInnerContainer, { backgroundColor: '#9FC4EF', borderRadius: 10 }]}>
        <View style={stylesDetails.itemDetails}>
          <Text style={stylesDetails.itemText}>Nombre: {item.names}</Text>
          <Text style={stylesDetails.itemText}>Egresado de: {item.graduationInstitution}</Text>
          <Text style={stylesDetails.itemText}>Especialidad: {item.speciality}</Text>
          <View style={stylesDetails.buttonsContainer}>
        <TouchableOpacity style={[stylesDetails.button, { backgroundColor: 'green' }]} onPress={() => contactarHandler(item.id)}>
          <Text style={stylesDetails.buttonText}>Contactar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesDetails.button, { backgroundColor: '#3498db', marginLeft: 10, marginRight: 10 }]} onPress={() => ampliarHandler(item.id)}>
          <Text style={stylesDetails.buttonText}>Ampliar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesDetails.button, { backgroundColor: 'red' }]} onPress={() => rechazarHandler(item.id)}>
          <Text style={stylesDetails.buttonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
        </View>
      </View>
      
    </View>
      )):<Text>No hay solicitudes de trabajo</Text>
      }
    </View>
  );
};



export default ListaSolicitudes;
