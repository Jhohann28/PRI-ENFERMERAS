import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../Styles/StartPageStyles.js';
import * as ownStyles from "../../Styles/LoginStyles.js"
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import {appFirebase } from "../../Data/firebaseConfig.js";
import { useNavigation } from '@react-navigation/native';


import UserController from '../../Controllers/UserController.js';
import DataUser from "../../Data/DataUser.js";
import UserLogin from '../../Models/UserLogin.js';

export default function Loggin() {
  const nav = useNavigation();

  const route = useRoute(); 

  const { type } = route.params;

  //#region Usestates
   const [email, setEmail]= useState("");
   const [password, setPassword]= useState("");
   const [error, setError]=useState("");

  //#endregion
  const doLogin =async (role)=>{
    let uController = new UserController();
    let myUser = new UserLogin(email.trim(),password);
    if(uController.isAllOk(myUser)==true){ //estoy devolviendo distintos tipos de datos
      //validations
      let dataUser = new DataUser();
      let r = await dataUser.authUsers(myUser);
    
        if(r!==true){
          setError(r);
          return;
        }
        else{
          let finalResult= await dataUser.getRoleAndUserAuth(role+"");

          if(finalResult=="Acceso denegado"){
            setError("Acceso denegado");
            return;
          }
          console.log("Bienvendo: "+ finalResult.personRef.names);
          //hacer transition
          switch(type){
            case 1:
              nav.replace("AdminHome");

            break;
            case 2:
              nav.replace("NurseHome");
              break;
              case 0:
               nav.replace("UserHome");
              break;
          }

        }
        
    }
    else{
      setError(uController.isAllOk(myUser));

    }
    
  }

  

    return (
      <>
      <View style={styles.container}>
      <View style={styles.startHeader}>
          <Text style={styles.headerText} >¡BIENVENIDO!</Text>
      </View>
      <ScrollView style={styles.myScroll} >
          <View style={styles.container}>
              <View style={ownStyles.default.myContainerImg}>
                  <Image source={require("../../assets/images/GeneralImages/icon.png")} style={styles.myImg}>

                  </Image>
              </View>
              
              <View style={ownStyles.default.myInputGroup}>
                <View style={ownStyles.default.myInputLabelBack}>
                  <Text style={ownStyles.default.myInputLabel} >E-mail: </Text>
                </View>
                <TextInput placeholder='Ingrese su e-mail ' keyboardType='email-address' style={ownStyles.default.myInputText}
                  onChangeText={(text)=>setEmail(text)} value={email}
                ></TextInput>
              </View>

              <View style={ownStyles.default.myInputGroup}>
                <View style={ownStyles.default.myInputLabelBack}>
                  <Text style={ownStyles.default.myInputLabel} >Contraseña: </Text>
                </View>
                <TextInput placeholder='Ingrese su contraseña' secureTextEntry={true} style={ownStyles.default.myInputText}
                  onChangeText={(text)=>setPassword(text)} value={password}
                
                ></TextInput>
              </View>

             
              <View style={styles.containerHorizontal}>
                  <TouchableOpacity style={styles.btnTypeThree}><Text style={styles.btnTypeOneText} onPress={()=>doLogin(type)} >Iniciar Sesión</Text></TouchableOpacity>
              </View>
              
              {type==0? <><View >
                <Text style={{textAlign:"center", fontWeight:"bold"}}>o</Text>
              </View><View style={ownStyles.default.btnTypeFour}>
              <TouchableOpacity ><Text style={styles.btnTypeOneText}> <AntDesign name="google" size={24} color="white" /> Continuar con Google</Text></TouchableOpacity>

              </View></>:<View/>

              }
             
              <View >
                <Text style={{textAlign:"center", color:"red", margin:5}}>{error}</Text>
              </View>

              <TouchableOpacity >
                <Text style={ownStyles.default.links}>¿No tienes una cuenta?</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style={ownStyles.default.links}>Olvidé mi contraseña</Text>
              </TouchableOpacity>

          </View>


      </ScrollView>
     


  </View>
   <View style={styles.startFooter}>
   <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
</View></>
    );
}
