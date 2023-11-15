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
import ValidateJob from '../../Tools/JobRequestValidator.js';





export default function JobRequest() {

  //#region USESTATES
    const [ci, setCi] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondLastName, setSecondLastName] = useState('');
    const [email, setEmail] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [phone, setPhone] = useState('');
    const [titulationDate, setTitulationDate] = useState(new Date());
    const [graduationInstitution, setGraduationInstitution] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
 

  //#endregion
    const handleNameChange = (text) => {
      setName(text);

 

   

   
      
    };
    
    
    
    const handleDateChange = (event, date) => {     

      setShowDatePicker(false);     
      if (date !== undefined) {       
        setTitulationDate(date);     
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
                ci:ci.trim(),//permitir letras y numeros 106512-A , 12313212 , permitir una E al inicio *opcional
                email:email.trim(),//regex correo
                graduationInstitution:graduationInstitution.trim(), //mismo regex que nombre
                lastName:lastName.trim(),//permitir solo letras con acentos y ñ
                names:name.trim(),//permitir espacios pero que el campo no este lleno de espacios
                phone:phone.trim(),//solo numeros de 6 a 8
                secondLastName:secondLastName.trim(),//puede estar vacio pero si no esta vacio validar
                speciality:speciality.trim(),//mismo regex que nombre
                titulationDate: titulationDate
            }
            let vldtn = new ValidateJob();
            let validRes =vldtn.validateAllJob(data);
            if(validRes != true){
                Alert.alert("Error en el ingreso de los campos", validRes);
                return;
            }


            let dataJobr = new DataJobRequest();
            let res=  await  dataJobr.uploadFiles(names,uri,data); //ya da siuu
            if(res== true){
              console.log("Se registro");  
              Alert.alert("Éxito", 'Se envió su solicitud de trabajo al administrador, espere por una respuesta')
              nav.navigate("StartPage");
            }
            else{
              Alert.alert('Error', "ha habido un error, verifique que el correo esté disponible y que subió su pdf")
            }
      
        } catch (error) {
            
        }
        
    }
    
    return (
      <>
     
       <View style={stylesNf.container}>
      <View style={styles.startHeader}>
          <Text style={styles.headerText} >Solicitud de Trabajo</Text>
      </View>
      <ScrollView style={styles.myScroll} >
        <View style={{padding:18}}>
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
            value={name}
            onChangeText={handleNameChange}
          />
        
        </View>
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Apellido Paterno</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Apellido Paterno"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        
      </View>
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Apellido Materno</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Apellido Materno"
          value={secondLastName}
          onChangeText={(text) => setSecondLastName(text)}
        />
        
      </View>
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Correo</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Correo"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        
      </View>
      <View style={stylesNf.section}>
        <Text style={stylesNf.label}>Especialidad</Text>
        <TextInput
          style={stylesNf.input}
          placeholder="Especialidad"
          value={speciality}
          onChangeText={(text) => setSpeciality(text)}
        />
        
      </View>
      <View style={stylesNf.section}>
          <Text style={stylesNf.label}>Teléfono</Text>
          <TextInput
            style={stylesNf.input}
            placeholder="Teléfono"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          
        </View>
      <Text>Fecha de Titulación</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={stylesNf.dateTimePicker}>
          <FontAwesome name="calendar" size={20} color="#333" style={stylesNf.calendarIcon} />
          <Text style={stylesNf.dateTimePickerText}>
            {titulationDate != null ? titulationDate.toLocaleDateString() : "Ingrese fecha de Titulación"}
          </Text>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={titulationDate}
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
          value={graduationInstitution}
        
        onChangeText={(text) => setGraduationInstitution(text)}
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
          
      
     
              
        </View>
       

      </ScrollView>
      
       </View>
       <View style={styles.startFooter}>
      <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
     


</View>
   
  
</>
    );
}
