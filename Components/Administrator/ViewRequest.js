import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import { ViewRequestStyle } from '../../Styles/ViewRequestStyle';
import soli from "../../assets/images/Windows/solicitud.png";

const App = () => {

  return (

    <View style={ViewRequestStyle.container}>

      <View style={ViewRequestStyle.container2}>
        <Text style={ViewRequestStyle.title}>Solicitud de Trabajo </Text>
        <Image source={require(soli)} style={ViewRequestStyle.icon}/>

      </View>
      
      

      <View style={ViewRequestStyle.card}>

      <Text style={ViewRequestStyle.name}>Ana </Text>
      <Text style={ViewRequestStyle.especialidad}>Especialidad:</Text>
      <Text style={ViewRequestStyle.telefono}>Nro. Telefono: </Text>

      <Text style={ViewRequestStyle.experience}>Experiencia: </Text>
      <View style={ViewRequestStyle.pdf}>

          <Text style={ViewRequestStyle.curriculum}>Curriculum adjunto: 
          
          </Text>
          <TouchableOpacity style={ViewRequestStyle.buttonCurric}>
                  <Text style={ViewRequestStyle.textButton}>Ver PDF curriculum</Text>
          </TouchableOpacity>
      </View>
      

    </View>

      <View style={ViewRequestStyle.buttons}>

      <TouchableOpacity style={ViewRequestStyle.button}>
              <Text style={ViewRequestStyle.textButton}>CONTACTAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ViewRequestStyle.buttonAceptar}>
              <Text style={ViewRequestStyle.textButton}>ACEPTAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ViewRequestStyle.buttonRechazar}>
              <Text style={ViewRequestStyle.textButton}>RECHAZAR</Text>
      </TouchableOpacity>

      </View>

    </View>

  );
}; export default App;