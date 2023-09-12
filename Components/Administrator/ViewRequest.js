import React from 'react';

import { View, Text, Button, StyleSheet,Image } from 'react-native';

import { stylesRequest } from '../../Styles/ViewRequest';

 

const Card = ({ name,especialidad,telefono, experience, curriculum }) => {

  return (

    <View style={stylesRequest.card}>

      <Text style={stylesRequest.name}>{name}</Text>
      <Text style={stylesRequest.especialidad}>Especialidad: {especialidad}</Text>
      <Text style={stylesRequest.telefono}>Nro. Telefono: {telefono}</Text>

      <Text style={stylesRequest.experience}>Experiencia: {experience}</Text>

      <Text style={stylesRequest.curriculum}>Curriculum adjunto: {curriculum}</Text>

    </View>

  );

};

 

const App = () => {

  return (

    <View style={stylesRequest.container}>
      <Image source={require('./assets/Windows/solicitud.png')} style={stylesRequest.icon}/>

      

      <Card

        name="Ana Villarroel"

        experience="3 años"

        especialidad="pediatria"

        telefono="77090123"

        curriculum="curriculum.pdf"

      />

      <View style={stylesRequest.buttons}>

        <Button title="Dar de Alta" color="#060C47" />

        <Button title="Contactar" color="#0FB61C" />

        <Button title="Rechazar" color="#F3190B" />

      </View>

    </View>

  );

};

export default App;