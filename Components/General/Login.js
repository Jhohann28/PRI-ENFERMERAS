import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../styles/StartPageStyles.js';
import * as ownStyles from "../../styles/LoginStyles.js"
import { AntDesign } from '@expo/vector-icons';

export default function Loggin(props) {
  

    return (

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
                <TextInput placeholder='Ingrese su e-mail ' keyboardType='email-address' style={ownStyles.default.myInputText}></TextInput>
              </View>

              <View style={ownStyles.default.myInputGroup}>
                <View style={ownStyles.default.myInputLabelBack}>
                  <Text style={ownStyles.default.myInputLabel} >Contraseña: </Text>
                </View>
                <TextInput placeholder='Ingrese su contraseña' secureTextEntry={true} style={ownStyles.default.myInputText}></TextInput>
              </View>

             
              <View style={styles.containerHorizontal}>
                  <TouchableOpacity style={styles.btnTypeThree}><Text style={styles.btnTypeOneText}>Iniciar Sesión</Text></TouchableOpacity>
              </View>
              
              {props.type==0? <><View >
                <Text style={{textAlign:"center", fontWeight:"bold"}}>o</Text>
              </View><View style={ownStyles.default.btnTypeFour}>
              <TouchableOpacity ><Text style={styles.btnTypeOneText}> <AntDesign name="google" size={24} color="white" /> Continuar con Google</Text></TouchableOpacity>

              </View></>:<View/>

              }
             
              <View >
                <Text style={{textAlign:"center", color:"red", margin:5}}>Errores</Text>
              </View>

              <TouchableOpacity >
                <Text style={ownStyles.default.links}>¿No tienes una cuenta?</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style={ownStyles.default.links}>Olvidé mi contraseña</Text>
              </TouchableOpacity>

          </View>


      </ScrollView>
      <View style={styles.startFooter}>
          <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
      </View>


  </View>
    );
}
