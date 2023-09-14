import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button,ImageBackground,TouchableOpacity} from 'react-native';
import { ChagePassword } from '../../Styles/ChangePassword';


const ChagePassword = () => {
  return (
   
        <ImageBackground source={require('./assets/Windows/clave.png')} style={styles.backgroundImage}>
          <View style={styles.container}>
          <View style={styles.containerHead}></View>
          <Text style={styles.title}>Cambiar Contraseña</Text>
          <TextInput style={styles.input} placeholder='Ingrese su nueva Contraseña'></TextInput>
          <Text style={styles.textBack}>Nueva Contraseña</Text>
          <TextInput style={styles.input} placeholder='Ingrese nuevamente'></TextInput>
          <Text style={styles.textBack2}>Repetir Nueva Contraseña</Text>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>CAMBIAR CONTRASEÑA</Text>
          </TouchableOpacity>
          <TouchableOpacity title='erdsds'></TouchableOpacity>
          <StatusBar style="auto" />
          </View>
          
        </ImageBackground>
    )
};
export default ChagePassword;