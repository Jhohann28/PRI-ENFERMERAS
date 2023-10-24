import React , { useState}from 'react';
import {  Text, View, ScrollView, Image, TouchableOpacity,  TouchableHighlight, Alert } from 'react-native';
import { stylesUserRegistration } from '../../Styles/UserRegistrationStyles.js';
import { TextInput, Button } from 'react-native-paper';
import DataUser from '../../Data/DataUser.js'; // Asegúrate de usar el nombre de archivo correcto
import { getFirestore,doc,getDoc,query,where,getDocs, updateDoc, runTransaction, Transaction, collection, serverTimestamp, } from "firebase/firestore";
import { regexNombre, regexApellido, regexCI, regexEmail, regexGenero, regexCelular } from '../../Tools/UserValidationsForm.js';
import ValidationsForm from '../../Tools/UserValidationsForm.js'
import {Picker} from '@react-native-picker/picker';
import UserRegisterIMPL from '../../Controllers/UserRegisterIMPL.js';
import usuario from '../../assets/images/GeneralImages/usuario.png';
import { useNavigation } from '@react-navigation/core';




  const dataUser = new DataUser();

  const UserForm = () => {

  const [ci, setCi] = useState('');
  //const [ciError, setCiError] = useState(false);
  const [names, setNames] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastname, setSecondLastname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const [selectedValue, setSelectedValue] = useState('Masculino');
  
    const n = useNavigation();
  const handleSubmit = async () => {
    // Crea un objeto person con los valores de los estados
    const person = {
      ci:ci.trim(),
      names:names.trim(),
      lastName:lastName.trim(),
      secondLastname:secondLastname.trim(),
      email:email.trim(),
      gender:gender,
      phone:phone.trim(),
    };

    
    try {
      setError('');
      let v = new UserRegisterIMPL();
      if(v.validateForm(person) != true)
      {
        console.log(v.validateForm(person));
        setError(v.validateForm(person));
        
        return; 
      }



      console.log("estoy entrando");
      await dataUser.registerUser(person);
      Alert.alert("Se registró", "Revise su correo electrónico para ingresar.")
      n.navigate("Loggin",{type:0});
      setCi('');
      setNames('');
      setLastName('');
      setSecondLastname('');
      setEmail('');
      setGender('');
      setPhone('');

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Ha ocurrido un error insesperado");
    }
  
  }
  

  return (
    <>
      <View style={stylesUserRegistration.container}>
       
        <Image
          source={usuario}
          style={stylesUserRegistration.imageUser}
        /> 
        <View style={stylesUserRegistration.container2}>
          <ScrollView>
            <TextInput
              style={stylesUserRegistration.textInput}
              label="ci"
              value={ci}
              onChangeText={(text) => setCi(text)}
            />

            <TextInput
              style={stylesUserRegistration.textInput}
              label="Nombre"
              value={names}
              onChangeText={(text) => setNames(text)}
            />

            <TextInput
              style={stylesUserRegistration.textInput}
              label="Apellido Paterno"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />

            <TextInput
              style={stylesUserRegistration.textInput}
              label="Apellido Materno"
              value={secondLastname}
              onChangeText={(text) => setSecondLastname(text)}
            />

            <TextInput
              style={stylesUserRegistration.textInput}
              label="Correo"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Picker        
            selectedValue={selectedValue}                   
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue); 
              setGender (itemValue)         
            }}>         
              <Picker.Item label="Masculino" value="Masculino" />        
              <Picker.Item label="Femenino" value="Femenino" />                       
            </Picker>

            <TextInput
              style={stylesUserRegistration.textInput}
              label="Teléfono"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />

            <Text>
              {error}
            </Text>
            <Button mode="contained" id="btn" onPress={handleSubmit} style={stylesUserRegistration.button}>
              Registrar
            </Button>

            <TouchableOpacity>
              <Text style={stylesUserRegistration.links}>I have an account. Login</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default UserForm;
  