import React, { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { editServicestyles } from '../../Styles/EditServices';
 

const EditServiceScreen = () => {

  const [name, setName] = useState('');

  const [price, setPrice] = useState('');

  const [description, setDescription] = useState('');

 

  const handleSave = () => {

    // Add your logic to save the service here

  };

 

  return (

    <View style={editServicestyles.container}>
      <View style={editServicestyles.head}></View>

      <Text style={editServicestyles.title}>Editar servicio</Text>

      <TextInput

        style={editServicestyles.input}

        placeholder="Nombre"

        value={name}

        onChangeText={setName}

      />

      <TextInput

        style={editServicestyles.input}

        placeholder="Precio"

        value={price}

        onChangeText={setPrice}

      />

      <TextInput

        style={editServicestyles.inputD}

        placeholder="Descripcion"

        value={description}

        onChangeText={setDescription}

      />

      <Button title="Guardar" onPress={handleSave} />

    </View>

  );

};

export default EditServiceScreen;