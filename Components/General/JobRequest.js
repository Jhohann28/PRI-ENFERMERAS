import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,Image,Alert } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../Styles/StartPageStyles.js';
import * as ownStyles from "../../Styles/LoginStyles.js"
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import {appFirebase } from "../../Data/firebaseConfig.js";
import { useNavigation } from '@react-navigation/native';

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google.js";
import { GoogleAuthProvider,onAuthStateChanged, signInWithCredential, getAuth } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as DocumentPicker from 'expo-document-picker';
import DataJobRequest from '../../Data/DataJobRequest.js';
import { stylesNf } from '../../Styles/FormNurseStyles.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';





export default function JobRequest() {
    const [ci, setCi] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [correo, setCorreo] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [añoTitulacion, setAñoTitulacion] = useState(new Date());
    const [institucionAcademica, setInstitucionAcademica] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [validationMessageNombre, setValidationMessageNombre] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [validationMessagePhoneNumber, setValidationMessagePhoneNumber ] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [validationMessages, setValidationMessages] = useState({
      nombre: '',
      telefono: '',
      // ... Agrega más campos según sea necesario ...
    });

  
    const handleNameChange = (text) => {
      setNombre(text);

    const regexForName = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const isValidName = regexForName.test(text);

    const regexForNumbers = /^[0-9]+$/;
    const isValidNumber = regexForNumbers.test(text);

    setValidationMessages({
      ...validationMessages,
      nombre: isValidName ? '' : 'Por favor, ingrese un nombre válido.',
      telefono: isValidNumber ? '' : 'Por favor, ingrese un número válido.',
      // ... Ajusta las validaciones para otros campos según sea necesario ...
    });

    setIsNameValid(isValidName);
    setIsPhoneNumberValid(isValidNumber);
      
    };
    
    
    
    const handleDateChange = (event, date) => {     

      setShowDatePicker(false);     
      if (date !== undefined) {       
        setAñoTitulacion(date);     
      }  
     };  
    const[uri, seturi] = useState("");
    const[names, setname] = useState("");

  const nav = useNavigation();
    var Uri = "";
    var Name = "";
  const route = useRoute(); 
  const pickDocument = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
        if (!result.canceled) {
            console.log(result.assets[0].uri);
            Uri = result.assets[0].uri;
            Name=  result.assets[0].name;
            setname(Name);
            seturi(Uri);
        } else {
            console.log("nada che");

        }
        console.log(Name);
      } catch (error) {
        console.error('Error al seleccionar el archivo:', error);
      }
  };
 useEffect(()=>{ setname(Name)}, [Uri])
  
  
  
  

    const LoadFiles= async()=>{
        try {
          if (!isNameValid || !isPhoneNumberValid) {
            setValidationMessage('Por favor, corrija los errores antes de enviar la solicitud.');
            Alert.alert(validationMessage);
            return;
          }
          

            let data={
                ci:ci,//permitir letras y numeros 106512-A , 12313212 , permitir una E al inicio *opcional
                email:correo,//regex correo
                graduationInstitution:institucionAcademica, //mismo regex que nombre
                lastName:apellidoPaterno,//permitir solo letras con acentos y ñ
                names:nombre,//permitir espacios pero que el campo no este lleno de espacios
                phone:telefono,//solo numeros de 6 a 8
                secondLastName:apellidoMaterno,//puede estar vacio pero si no esta vacio validar
                speciality:especialidad,//mismo regex que nombre
                titulationDate: añoTitulacion
            }
            



            let dataJobr = new DataJobRequest();
      await  dataJobr.uploadFiles(names,uri,data); //ya da siuu
      console.log("Se registro");  
      Alert.alert('Se registro')
        } catch (error) {
            
        }
        
    }
    
    return (
      <>
       <View style={stylesNf.container}>
       <View style={styles.container}>
      <View style={styles.startHeader}>
          <Text style={styles.headerText} >Solicitud de Trabajo</Text>
      </View>
      <ScrollView style={styles.myScroll} >
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Ci</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Ci"
          value={ci}
          onChangeText={(text) => setCi(text)}
        />
        
      </View>
      <View style={stylesNf.section}>
          <Text style={stylesNf.label}>Nombre</Text>
          <TextInput
            style={stylesNf.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={handleNameChange}
          />
          <Text style={stylesNf.validationMessage}>{validationMessages.nombre}</Text>
        </View>
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Apellido Paterno</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Apellido Paterno"
          value={apellidoPaterno}
          onChangeText={(text) => setApellidoPaterno(text)}
        />
        
      </View>
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Apellido Materno</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Apellido Materno"
          value={apellidoMaterno}
          onChangeText={(text) => setApellidoMaterno(text)}
        />
        
      </View>
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Correo</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Correo"
          value={correo}
          onChangeText={(text) => setCorreo(text)}
        />
        
      </View>
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Especialidad</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Especialidad"
          value={especialidad}
          onChangeText={(text) => setEspecialidad(text)}
        />
        
      </View>
      <View style={stylesNf.section}>
          <Text style={stylesNf.label}>Teléfono</Text>
          <TextInput
            style={stylesNf.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={(text) => setTelefono(text)}
          />
          <Text style={stylesNf.validationMessage}>{validationMessages.telefono}</Text>
        </View>
      <Text>Fecha de Titulación</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={stylesNf.dateTimePicker}>
          <FontAwesome name="calendar" size={20} color="#333" style={stylesNf.calendarIcon} />
          <Text style={stylesNf.dateTimePickerText}>
            {añoTitulacion != null ? añoTitulacion.toLocaleDateString() : "Ingrese fecha de Titulación"}
          </Text>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={añoTitulacion}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={stylesNf.dateTimePicker}  // Estilo para DateTimePicker
        />
      )}
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Institución Academica</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Institución Academica"
          value={institucionAcademica}
        
        onChangeText={(text) => setInstitucionAcademica(text)}
        />
        
      </View>
      
      <View style={styles.container}>
  <TouchableOpacity 
    style={styles.uploadButton}  // Nuevo estilo para el botón
    onPress={() => { pickDocument(); seturi(Uri) }}
  >
    <Text style={styles.uploadButtonText}>{names !== "" ? names : "Subir curriculum..."}</Text>
  </TouchableOpacity>
</View>
    

<TouchableOpacity onPress={() => LoadFiles()} style={stylesNf.button} >
          <Text>Enviar Solicitud</Text>
        </TouchableOpacity>
      <TouchableOpacity >
                <Text style={stylesNf.links}>¿Ya trabajas con nosotros? Iniciar Sesión</Text>
              </TouchableOpacity>
          
              

      </ScrollView>
      
       </View>
       <View style={styles.startFooter}>
      <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
     


</View>
   
  
</View></>
    );
}
