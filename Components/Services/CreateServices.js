import React, { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { createServiceStyle } from '../../Styles/CreateServicesStyle';
 

const InsertServiceScreen = () => {

  const [name, setName] = useState('');

  const [price, setPrice] = useState('');

  const [description, setDescription] = useState('');

 

  const handleSave = () => {

    // Add your logic to save the service here

  };

 

  return (

    <View style={createServiceStyle.container}>
      <View style={createServiceStyle.head}></View>

      <Text style={createServiceStyle.title}>Crear Nuevo Servicio</Text>

      <TextInput

        style={createServiceStyle.input}

        placeholder="Nombre"

        value={name}

        onChangeText={setName}

      />

      <TextInput

        style={createServiceStyle.input}

        placeholder="Precio"

        value={price}

        onChangeText={setPrice}

      />

      <TextInput

        style={createServiceStyle.inputD}

        placeholder="Descripcion"

        value={description}

        multiline={true}

        onChangeText={(description)=>setDescription(description)}

      />

      <Button title="Crear" onPress={handleSave} color="blue"/>

    </View>

  );

};

export default InsertServiceScreen;