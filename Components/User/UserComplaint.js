import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { stylesComplaint } from '../../Styles/ComplaintStyle.js';

const QuejaForm = ({ onCancelar, onRegistrar }) => {
  const [descripcion, setDescripcion] = useState('');

  const handleRegistrar = () => {
    // Validación simple, puedes personalizar según tus necesidades
    if (descripcion.trim() === '') {
      Alert.alert('Error', 'La descripción no puede estar vacía.');
    } else {
      // Obten la fecha actual
      const fecha = new Date().toLocaleDateString();
      
      // Genera una referencia única (puedes personalizar esto)
      const referencia = Math.random().toString(36).substring(7);

      // Llama a la función de registro pasando los datos
      onRegistrar({ descripcion, fecha, referencia });

      // Reinicia el estado del formulario
      setDescripcion('');
    }
  };

  return (
    <View style={stylesComplaint.container}>
      <Text style={stylesComplaint.label}>Descripción de la queja:</Text>
      <TextInput
        value={descripcion}
        onChangeText={(text) => setDescripcion(text)}
        placeholder="Ingrese la descripción"
        multiline
        style={stylesComplaint.input}
      />

      <View style={stylesComplaint.buttonContainer}>
        <Button title="Registrar" onPress={handleRegistrar} color="#4CAF50" style={[stylesComplaint.button]} />
        <Button title="Cancelar" onPress={onCancelar} color="#FF5733" style={[stylesComplaint.button]} />
      </View>
    </View>
  );
};



export default QuejaForm;
