import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { stylesDetails } from '../../Styles/JobDetailsStyle.js';

const ListaSolicitudes = () => {
  const solicitudes = [
    { id: '1', nombre: 'Solicitud 1', fecha: '01/10/2023', estado: 'Pendiente' },
    { id: '2', nombre: 'Solicitud 2', fecha: '02/10/2023', estado: 'Aprobada' },
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

  const renderItem = ({ item }) => (
    <View style={[stylesDetails.itemContainer, { backgroundColor: '#9FC4EF' }]}>
      <View style={stylesDetails.itemDetails}>
        <Text style={stylesDetails.itemText}>{item.nombre}</Text>
        <Text style={stylesDetails.itemText}>{item.fecha}</Text>
        <Text style={[stylesDetails.itemText]}>
          {item.estado}
        </Text>
      </View>
      <View style={stylesDetails.buttonsContainer}>
        <TouchableOpacity style={[stylesDetails.button, { backgroundColor: 'green' }]} onPress={() => contactarHandler(item.id)}>
          <Text style={stylesDetails.buttonText}>Contactar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesDetails.button, { backgroundColor: '#3498db' }]} onPress={() => ampliarHandler(item.id)}>
          <Text style={stylesDetails.buttonText}>Ampliar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stylesDetails.button, { backgroundColor: 'red' }]} onPress={() => rechazarHandler(item.id)}>
          <Text style={stylesDetails.buttonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={stylesDetails.container}>
      <FlatList
        data={solicitudes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};



export default ListaSolicitudes;
