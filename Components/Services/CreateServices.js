import React, { useState } from 'react';
import { View, Text, TextInput,Image,TouchableOpacity } from 'react-native';
import { CreateStyles } from '../../Styles/createService';
import create from '../../assets/images/Windows/createService.png';
 

const InsertServiceScreen = () => {

  const [name, setName] = useState('');

  const [price, setPrice] = useState('');

  const [description, setDescription] = useState('');

 

  const handleSave = () => {

    // Add your logic to save the service here

  };
  return (

    <View style={CreateStyles.container}>
      <View style={CreateStyles.head}>
        <Text style={CreateStyles.textHead}>PRI-ENFERMERAS</Text>
      </View>
      <View style={CreateStyles.container2}>
        <Text style={CreateStyles.title}>Crear Nuevo Servicio</Text>
        <Image source={require(create)} style={CreateStyles.icon}/>
      </View>

      

      <TextInput
        style={CreateStyles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={CreateStyles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={CreateStyles.inputD}
        placeholder="Descripcion"
        value={description}
        multiline={true}
        onChangeText={(description)=>setDescription(description)}
      />
      <TouchableOpacity style={CreateStyles.button}>
              <Text style={CreateStyles.textButton}>CREAR SERVICIO</Text>
      </TouchableOpacity>
    </View>
  );
};export default InsertServiceScreen;