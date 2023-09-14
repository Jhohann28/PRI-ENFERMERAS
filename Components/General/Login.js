import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput , ActivityIndicator} from 'react-native';
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


import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google.js";
import { GoogleAuthProvider,onAuthStateChanged, signInWithCredential, getAuth } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function Loggin() {
  
  const nav = useNavigation();

  const route = useRoute(); 

  const { type } = route.params;

  //#region Usestates
   const [email, setEmail]= useState("");
   const [password, setPassword]= useState("");
   const [error, setError]=useState("");

   const [loading, setLoading] = useState(false);

   //google:
   const [request, response, myMethod ] =  Google.useAuthRequest({
    iosClientId:"655441475070-4bdn0hlrdmb50aqt5d6mhajl4cv44srb.apps.googleusercontent.com"
    , androidClientId:"655441475070-c5o06mufa9m6cdgf1v1nkv7qnji01ifj.apps.googleusercontent.com"
  });
 //  setLoading(true);

  //#endregion
  const doLogin =async (role)=>{
    setError("");
    setLoading(true);
    let uController = new UserController();
    let myUser = new UserLogin(email.trim(),password);
    if(uController.isAllOk(myUser)==true){ //estoy devolviendo distintos tipos de datos
      //validations
      let dataUser = new DataUser();
      let r = await dataUser.authUsers(myUser);
    
        if(r!==true){
          setError(r);

          setLoading(false);

          return;
        }
        else{
          let finalResult= await dataUser.getRoleAndUserAuth(role+"");

          if(finalResult=="Acceso denegado"){
            setError("Acceso denegado");

          setLoading(false);
            return;
          }
          console.log("Bienvendo: "+ finalResult.personRef.names);
          //hacer transition
          dataUser.setUserLogued(finalResult);

          setLoading(false);

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

      setLoading(false);

    }
  }

  
  
  useEffect(()=>{
    if( response?.type==="success"){
      const{id_token}= response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      setLoading(true);

      signInWithCredential(getAuth(appFirebase),credential);

      const unsub= onAuthStateChanged(getAuth(appFirebase), async(user)=>{

        if(user){
          console.log(user);
          setError("");
           await myGoogleAuth(user);

           setLoading(false);
        }
        return ()=>unsub();
      })
    }
    
  },[response])

   let myGoogleAuth = async(muser)=>{
    let userData = new DataUser();
            userData.AuthID = muser.uid;
            let userFinal = await userData.getRoleAndUserAuth("0");
           if(userFinal=="Acceso denegado"){
              //registrar
              console.log("Tienes que registrar");
              let r= await userData.saveGoogleUserClient(muser);
              if(r==false){
                console.log("error ven");

                return;
              }
              userFinal = await userData.getRoleAndUserAuth("0");
           }
          
            //redirect
            console.log("Redirecciona");
            userData.setUserLogued(userFinal);
            nav.replace("UserHome");

           
   }

   const goToJob=()=>{
    nav.navigate("JobRequest");
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
                  <TouchableOpacity style={styles.btnTypeThree} onPress={()=>doLogin(type)}><Text style={styles.btnTypeOneText}  >Iniciar Sesión</Text></TouchableOpacity>
              </View>
              
              {type==0? <><View >
                <Text style={{textAlign:"center", fontWeight:"bold"}}>o</Text>
              </View><View style={ownStyles.default.btnTypeFour}>
              <TouchableOpacity onPress={()=>myMethod()} ><Text style={styles.btnTypeOneText}> <AntDesign name="google" size={24} color="white" /> Continuar con Google</Text></TouchableOpacity>

              </View></>:<View/>

              }
              <View style={{marginTop:10}}></View>
              {loading && <ActivityIndicator size="large" color="#064571" />}             
              <View >
                <Text style={{textAlign:"center", color:"red", margin:5}}>{error}</Text>
              </View>
              {type==0 || type==1?
                 <TouchableOpacity onPress={()=>{console.log("Hola")}}>
                 <Text style={ownStyles.default.links}>¿No tienes una cuenta?</Text>
               </TouchableOpacity>:

               <TouchableOpacity onPress={()=>{goToJob()}}>
               <Text style={ownStyles.default.links}>¿Quieres trabajar con nosotros?</Text>
               </TouchableOpacity>
              }

             
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
