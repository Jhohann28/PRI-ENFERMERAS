import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,Image,Alert } from 'react-native';
import { stylesN } from '../../Styles/ReportStyle.js';
import * as ImagePicker from 'expo-image-picker';

const FormularioPaciente = () => {
 
 
  const [costoServicio, setCostoServicio] = useState('');
  const [costosAdicionales, setCostosAdicionales] = useState('');
  const [descripcionMotivo, setDescripcionMotivo] = useState('');
  const [tratamientoRecibido, setTratamientoRecibido] = useState('');
  const [signosVitalesExamen, setSignosVitalesExamen] = useState('');
  const [referenciaEspecialista, setReferenciaEspecialista] = useState('');
  const [imagen, setImagen] = useState(null);


  

  const handleImagenChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagen(result.uri);
    }
  };

  const handleEnviarClick = () => {
    
    if (Object.keys(erroresActuales).length === 0) {
      // No hay errores, procesa los datos
      console.log('Formulario enviado con los siguientes datos:');
      
      
      console.log('Costo Servicio:', costoServicio);
      // ... (otros campos)
      console.log('Imagen:', imagen);
    } else {
      // Muestra un mensaje de error
      Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={stylesN.container}>
      
      <Text style={stylesN.headerText} >Reporte</Text>
            
      <Text style={stylesN.title}>Información del Paciente</Text>
      

      <View style={stylesN.section}>
        <Text style={stylesN.label}>Costo Adicional</Text>
        <TextInput
          style={stylesN.input}
          placeholder="Costo Adicional"
          value={costoServicio}
          onChangeText={(text) => setCostosAdicionales(text)}
        />
        
      </View>

      <View style={stylesN.section}>

        <Text style={stylesN.label}>Descripción</Text>
        <TextInput
          style={stylesN.textarea}
          placeholder="Descripción"
          value={descripcionMotivo}
          onChangeText={(text) => setDescripcionMotivo(text)}
          multiline
        />
        <Text style={stylesN.label}>Tratamiento</Text>
        <TextInput
          style={stylesN.textarea}
          placeholder="Tratamiento"
          value={tratamientoRecibido}
          onChangeText={(text) => setTratamientoRecibido(text)}
          multiline
        />
      </View>
      <View style={stylesN.section}>
  <Text style={stylesN.label}>Examen Fisico</Text>
  <TextInput
    style={stylesN.textarea}
    placeholder="Examen Fisico"
    value={signosVitalesExamen}
    onChangeText={(text) => setSignosVitalesExamen(text)}
    multiline
  />
  <Text style={stylesN.label}>Referencia</Text>
  <TextInput
    style={stylesN.textarea}
    placeholder="Especialista, hospital, etc"
    value={referenciaEspecialista}
    onChangeText={(text) => setReferenciaEspecialista(text)}
    multiline
  />
</View>

<View style={stylesN.section}>
  
  {imagen && <Image source={{ uri: imagen }} style={stylesN.image} />}
  <TouchableOpacity style={stylesN.button} onPress={handleImagenChange}>
    <Text style={stylesN.buttonText}>Seleccionar Imagen</Text>
  </TouchableOpacity>
</View>




      <TouchableOpacity style={stylesN.button} onPress={handleEnviarClick}>
        <Text style={stylesN.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default FormularioPaciente;
