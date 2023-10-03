import React, {useState} from 'react'
import { Text, View,TextInput,TouchableOpacity,Image } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import { Linking } from 'react-native';
import { styles } from '../../Styles/ContactDisclaimerStyle';


const App = () => {
  const phoneNumber='74603477'; //Numero ANONYMUSSS JAJAJAJAJA FROM DATABASE

  const handleCallPress = () => {
    const phoneNumberWithProtocol = `tel:${phoneNumber}`;
    Linking.openURL(phoneNumberWithProtocol)
      .then(() => console.log('La aplicación de teléfono se abrió correctamente.'))
      .catch((error) => console.error('Error al abrir la aplicación de teléfono: ', error));
  };




  return (
      <LinearGradient colors={['#2E3192','#1BFFFF']} style={styles.gradi}>
        <View style={styles.main}>
            <View style={styles.section}>
                <Text style={styles.dataText}>Nombre:</Text>
                <Text style={styles.dataText}>Motivo:</Text>
                <View style={styles.buttonsArea}>
                    <TouchableOpacity style={styles.buttonCall} onPress={handleCallPress}>
                      <Text style={styles.textButton}>Contactar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLow} >
                      <Text style={styles.textButton}>Dar de Baja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDenied} >
                      <Text style={styles.textButton}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.section}>
            <Text style={styles.dataText}>Nombre:</Text>
                <Text style={styles.dataText}>Motivo:</Text>
                <View style={styles.buttonsArea}>
                    <TouchableOpacity style={styles.buttonCall} onPress={handleCallPress}>
                      <Text style={styles.textButton}>Contactar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLow}>
                      <Text style={styles.textButton}>Dar de Baja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDenied}>
                      <Text style={styles.textButton}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.section}>
            <Text style={styles.dataText}>Nombre:</Text>
                <Text style={styles.dataText}>Motivo:</Text>
                <View style={styles.buttonsArea}>
                    <TouchableOpacity style={styles.buttonCall} onPress={handleCallPress}>
                      <Text style={styles.textButton}>Contactar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLow}>
                      <Text style={styles.textButton}>Dar de Baja</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDenied}>
                      <Text style={styles.textButton}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

      </LinearGradient>

      
  );
}; export default App;