import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput,ImageBackground,TouchableOpacity,Alert} from 'react-native';
import { isPasswordValid } from '../../Tools/Validations';
import {auth} from '../../Data/firebaseConfig';
import pass from '../../assets/images/Windows/clave.png'
import { Passwstyles } from '../../Styles/ChangePassword';

//FUNCIONA SI ESTA LOGEADO YA QUE RECUPERRA EL AUTHuSER DE LA SESION QUE ESTA EN CURSO

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handlePasswordChangeRequest = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Campos Vacíos', 'Por favor, complete ambos campos.');
    } else if (newPassword !== confirmPassword) {
      Alert.alert('Contraseñas Diferentes', 'Las contraseñas no coinciden.');
    } else if (!isPasswordValid(newPassword)) {
      Alert.alert('Contraseña Inválida', 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
    } else {
      try {
        const user = auth().currentUser; // Obtiene el usuario actualmente autenticado

        await user.updatePassword(newPassword); // Actualiza la contraseña del usuario

        Alert.alert('Contraseña Cambiada', 'La contraseña ha sido cambiada con éxito.');

        // Puedes redirigir al usuario a la pantalla de inicio de sesión o a otra pantalla
      } catch (error) {
        Alert.alert('Error', 'No se pudo cambiar la contraseña. Por favor, inténtelo de nuevo.');
        console.error(error);
      }
    }
  };

  return (
   
        <ImageBackground source={require(pass)} style={Passwstyles.backgroundImage}>
          <View style={Passwstyles.container}>
          <View style={Passwstyles.containerHead}></View>
          <Text style={Passwstyles.title}>Cambiar Contraseña</Text>
          <TextInput 
              style={Passwstyles.input} placeholder='Ingrese su nueva Contraseña' secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={newPassword}

          >
          </TextInput>
          <Text style={Passwstyles.textBack}>Nueva Contraseña</Text>
          <TextInput 
            style={Passwstyles.input} placeholder='Ingrese nuevamente' secureTextEntry={true}
        onChangeText={handleConfirmPasswordChange}
        value={confirmPassword}
          >
          </TextInput>
          <Text style={Passwstyles.textBack2}>Repetir Nueva Contraseña</Text>

     

          <TouchableOpacity style={Passwstyles.button} onPress={handlePasswordChangeRequest}>
              <Text style={Passwstyles.textButton}>CAMBIAR CONTRASEÑA</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
          </View>
          
        </ImageBackground>
        
   
  )
};
export default ChangePassword;