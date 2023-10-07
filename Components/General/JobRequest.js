import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity , ActivityIndicator, Alert} from 'react-native';
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
import { TextInput, Button } from 'react-native-paper';


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
            let data={
                ci:ci,
                email:correo,
                graduationInstitution:institucionAcademica,
                lastName:apellidoPaterno,
                names:nombre,
                phone:telefono,
                secondLastName:apellidoMaterno,
                speciality:especialidad,
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
      <View style={styles.container}>
      <View style={styles.startHeader}>
          <Text style={styles.headerText} >Solicitud de Trabajo</Text>
      </View>
      <ScrollView style={styles.myScroll} >
      <TextInput       
       style={stylesNf.textInput}
        label="Ci"
        value={ci}
        onChangeText={(text) => setCi(text)}
      />
      <TextInput       
       style={stylesNf.textInput}
        label="Nombre"
        value={nombre}
        onChangeText={(text) => setNombre(text)}
      />
      <TextInput
       style={stylesNf.textInput}
        label="Apellido Paterno"
        value={apellidoPaterno}
        onChangeText={(text) => setApellidoPaterno(text)}
      />
      <TextInput
       style={stylesNf.textInput}
        label="Apellido Materno"
        value={apellidoMaterno}
        onChangeText={(text) => setApellidoMaterno(text)}
      />
      <TextInput
       style={stylesNf.textInput}
        label="Correo"
        value={correo}
        onChangeText={(text) => setCorreo(text)}
      />
      <TextInput
       style={stylesNf.textInput}
        label="Especialidad"
        value={especialidad}
        onChangeText={(text) => setEspecialidad(text)}
      />
      <TextInput
       style={stylesNf.textInput}
        label="Teléfono"
        value={telefono}
        onChangeText={(text) => setTelefono(text)}
      />
      <Text>Fecha de Titulación</Text>
       <Text title="Seleccionar fecha" onPress={()=>setShowDatePicker(true)} >{añoTitulacion!=null? añoTitulacion.toLocaleDateString():"Ingrese fecha de Titulación"}</Text>      
       {showDatePicker && (<DateTimePicker        
       value={añoTitulacion}           
       mode="date"        
       display="default"          
        onChange={handleDateChange}   
              
        />       
        )}
      <TextInput
       style={stylesNf.textInput}
        label="Institución Académica"
        value={institucionAcademica}
        
        onChangeText={(text) => setInstitucionAcademica(text)}
        
      />
      <View style={styles.container}>
              <TouchableOpacity onPress={()=>{pickDocument(); seturi(Uri)}}><Text>{names!= ""? names:"Subir curriculum..."} </Text></TouchableOpacity>
              

          </View>
    

      <TouchableOpacity mode="contained" onPress={()=>LoadFiles()}  style={stylesNf.button}>
        <Text>Enviar Solicitud</Text>
      </TouchableOpacity>
      <TouchableOpacity >
                <Text style={stylesNf.links}>¿Ya trabajas con nosotros? Iniciar Sesión</Text>
              </TouchableOpacity>
          


      </ScrollView>
     


</View>
   <View style={styles.startFooter}>
   <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
</View></>
    );
}
