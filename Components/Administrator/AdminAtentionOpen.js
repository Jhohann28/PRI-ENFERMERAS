import React, { useEffect, useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import {Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase/app';
import appFirebase  from "../../Data/firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot, orderBy} from "firebase/firestore";
import MapMaker from '../../Tools/Maper.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import HistoryNurseData from '../../Data/HistoryNurseData/HistoryNurseData.js';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import logo from '../../assets/images/GeneralImages/logo.png'

const db = getFirestore(appFirebase);

const AdminAtentionOpen = () => {
    const[myuser, setuser] = useState("");
    const [atention, setAtention]= useState(null);
    const [inputFilter, setInputFilter] = useState("");



    const n = useNavigation();
    const r = useRoute();
    const {atentionn} = r.params;

    console.log(atentionn);

   
    var muser="";
    const getLocalUser =async()=>{

        try{
                muser = await AsyncStorage.getItem("user");
                let muserJson = muser? JSON.parse(muser): null;
                setuser(muserJson);
                
        }
        catch(e){
            console.error(e);
        }
    }
    useEffect(()=>{
        getLocalUser();
        

    },[])

     
    
     

     



    return (
        <View style = {stylesNurse.container}>
           <View style = {stylesAdmin.container2}>
                <Text style={stylesAdmin.texto}>Bienvenido</Text>
                <Text style={stylesAdmin.texto1}>{myuser!=""? myuser.personRef.names:""}</Text>
                <Ionicons name="ios-person-circle-outline" size={74} color="white" style={stylesAdmin.image} />
                  <View style = {stylesAdmin.container4}>
                <Text style={stylesAdmin.textCorporationTitle}>SISEEM</Text>
                <Text style={stylesAdmin.textCorporation}>Servicios de vida al 100%</Text>
                <Image
                    source={logo}
                    style = {stylesAdmin.image}
                />
            </View>
            </View>
           
            
   

            <View style = {stylesAdmin.container33}>



           
           <ScrollView style={stylesNurse.myScroll}>
             
             <View style={stylesNurse.myOpenAtention}>
                    <Text style={stylesNurse.myTextReport}>Nombre del Cliente: <Text style={{fontWeight:"normal"}}> {atentionn.clientRef.names+" "+atentionn.clientRef.lastName}</Text></Text>
                    <Text style={stylesNurse.myTextReport}>Fecha: <Text style={{fontWeight:"normal"}}>{atentionn.date}</Text></Text>
                    <Text style={stylesNurse.myTextReport}>Descripción General:  <Text style={{fontWeight:"normal"}}> {atentionn.description}</Text></Text>
                    <Text style={stylesNurse.myTextReport}>Dirección de Atención: <Text style={{fontWeight:"normal"}}>{atentionn.adress}</Text></Text>
                    <Text style={stylesNurse.myTextReport}>Examen Físico: <Text style={{fontWeight:"normal"}}> {atentionn.physicalTest}</Text></Text>
                    <Text style={stylesNurse.myTextReport}>Referencia: <Text style={{fontWeight:"normal"}}> {atentionn.reference}</Text></Text>
                    <Text style={stylesNurse.myTextReport}>Servicio: <Text style={{fontWeight:"normal"}}> {atentionn.serviceRef.name}</Text></Text>

                    <View style={stylesNurse.containerHorizontal}>

                    <Text style={stylesNurse.myTextReport2}>Costo de Servicio: <Text> {atentionn.serviceCurrentCost}</Text> Bs  |</Text>
                    <Text style={stylesNurse.myTextReport2}>Costo Adicional: <Text> {atentionn.aditionalCost}</Text>Bs.</Text>

                    </View>
                    <Text style={stylesNurse.myTextReport}>Total: <Text style={{fontWeight:"normal"}}> {atentionn.serviceCurrentCost+atentionn.aditionalCost} Bs.</Text></Text>
                    <Text style={stylesNurse.myTextReport}>Tratamiento: <Text style={{fontWeight:"normal"}}> {atentionn.treatment}</Text></Text>
                    <Text style={stylesNurse.myTextReport}>Enfermera: <Text style={{fontWeight:"normal"}}> {atentionn.nurseRef.names+" "+ atentionn.nurseRef.lastName+" "+ atentionn.nurseRef.secondLastName}</Text></Text>
                    <Text style={stylesNurse.myTextReport}>Calificación: <Text style={{fontWeight:"normal"}}> {atentionn.valoration}/5</Text></Text>

                    {atentionn.imageUrl != ""? <Image source={{uri: atentionn.imageUrl}} style={stylesNurse.MyImg}></Image>
:<Text></Text>}



             </View>
           
           </ScrollView>
           </View>
        </View>

    )
}

export default AdminAtentionOpen;


/**
 * 
 * 
 * { requests.length>0?
              requests.map((requestss, k) => {
                       if(!rejectedList.includes(requestss.id)){
                        return(
                          <TouchableOpacity style={stylesNurse.myAtentionRequestItem} key={requestss.id} onPress={()=>{OpenALot(requestss)}} >
                          <View style={stylesNurse.containerHorizontal}
                          >
                              <MaterialCommunityIcons name="hospital-marker" size={44} color="black" />
                              <View  style={stylesNurse.containerHorizontal2}
                              >
                                  <View style={  stylesNurse.containerHorizontal}
                                          >
                                              <Text style={stylesNurse.left} >{requestss.userRef.personRef.names.split(" ")[0]+" "+requestss.userRef.personRef.lastName}</Text>
                                              <Text  style={stylesNurse.right2}>{requestss.serviceRef.name}</Text>
  
                                              <Text  style={stylesNurse.right}>{requestss.serviceRef.price} Bs.</Text>
                                      </View>
                                      <View style={stylesNurse.containerHorizontal}
                                          >
                                              <Text  style={stylesNurse.left}>{requestss.directionName}</Text>
  
                                      </View>
                              </View>
                          </View>
                          <View style={{alignSelf:"center"}}><Text style={{textAlign:"center"}} >{requestss.date}</Text></View>
                          <View style={stylesNurse.containerHorizontalButtons}>
                                  <TouchableOpacity style={stylesNurse.btnAccept}>
                                      <Text style={{textAlign:"center", fontWeight:"bold", fontSize:15}}>Aceptar</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={stylesNurse.btnRemove}>
                                      <Text  style={{textAlign:"center", fontWeight:"bold", fontSize:15, color:"white"}}  onPress={()=>Reject(requestss.id)} >Rechazar</Text>
                                  </TouchableOpacity>
  
                          </View>
                          </TouchableOpacity>
                        )
                       }
                       
             }): <Text style={stylesNurse.MessageText}>No tiene atenciones brindadas</Text>}
               
             
 */