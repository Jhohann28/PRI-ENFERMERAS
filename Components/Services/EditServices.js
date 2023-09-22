import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { EditStyles } from '../../Styles/editService';
import edit from '../../assets/images/Windows/editService.png';

 

const EditServiceScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

 
  const handleSave = () => {
    // Add your logic to save the service here
  };
  return (

    <View style={EditStyles.container}>
      <View style={EditStyles.head}>
        <Text style={EditStyles.textHead}>PRI-ENFERMERAS</Text>
      </View>
      <View style={EditStyles.container2}>
        <Text style={EditStyles.title}>Editar Servicio</Text>
        <Image source={require(edit)} style={EditStyles.icon}/>
      </View>
      <TextInput
        style={EditStyles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={EditStyles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={EditStyles.inputD}
        placeholder="Descripcion"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={EditStyles.button}>
              <Text style={EditStyles.textButton}>GUARDAR CAMBIOS</Text>
      </TouchableOpacity>
    </View>
  );

};export default EditServiceScreen;