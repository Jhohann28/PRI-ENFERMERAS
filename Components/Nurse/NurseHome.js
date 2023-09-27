import React, { useEffect, useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import {Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import DataNurse from '../../Data/DataNurse.js';

import firebase from 'firebase/app';
import appFirebase  from "../../Data/firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot} from "firebase/firestore";
import MapMaker from '../../Tools/Maper.js';
import { useNavigation } from '@react-navigation/native';

const db = getFirestore(appFirebase);

const NurseScreen = () => {

    const n = useNavigation();
    const dtN = new DataNurse();
    const[requests, SetRequests]= useState([]);
    const[load, setload]= useState(false);
    const[myuser, setuser] = useState("");
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

       
    const[rejectedList, setRejected]=  useState([]);
        
    const Reject =(index)=>{
      let n=[...rejectedList];
      n.push(index);
        setRejected(n);
    }

    const susc = async () => {
        try {
          const q = query(collection(db, "AtentionRequest"), where("status", "==", 1));
          const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const rr = [];
      
            const promises = querySnapshot.docs.map(async (doc) => {
              let service = await dtN.getServiceAtention(doc.data());
              let user = await dtN.getUserAtention(doc.data());
              user.personRef = await dtN.getPersonAtention(user);
              let myAuxReq = dtN.getAtentionsToShow(doc.data(), doc, service, user);

              let maper = new MapMaker();
              myAuxReq.directionName = await maper.getAddressFromCoordinates(myAuxReq.userRef.location.latitude,myAuxReq.userRef.location.longitude);
              console.log(myAuxReq);
              rr.push(myAuxReq);
            });
      
            await Promise.all(promises);
      
            console.log(requests.length);
            SetRequests(rr);
            setload(true);
      
            console.log(rr.length);
          });
        } catch (error) {
          // Maneja el error adecuadamente
        }
      };
      
      useEffect(() => {
        susc();
      }, []);
   
      const OpenALot=(atentionr)=>{
        


        n.navigate("AtentionOpen", {atention: atentionr})
      }

    return (
        <View style = {stylesNurse.container}>
           <View style = {stylesNurse.container2}>

                <Text style={stylesNurse.texto}>Bienvenido </Text>
                <Text style={stylesNurse.texto1}>{myuser!=""? myuser.personRef.names+" "+ myuser.personRef.lastName :""}</Text>
                
                <MaterialIcons name="account-circle" size={74} color="black"  style = {stylesNurse.image} />
                <TextInput
                    style = {stylesNurse.inputSearch}
                    placeholder='Buscar ofertas en el area'                   
                />
                <Ionicons name="search" size={30} color="black" style ={stylesNurse.iconSearch}/>
                <Text style={stylesNurse.texto2}>Ofertas</Text>
                <Text style={stylesNurse.texto3}>Tiquipaya</Text>
           </View>
           <ScrollView style={stylesNurse.myScroll}>
            
             
             { requests.length>0?
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
                                              <Text style={stylesNurse.left} >{requestss.userRef.personRef.names+" "+requestss.userRef.personRef.lastName+k}</Text>
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
                       
             }): <Text style={stylesNurse.MessageText}>No hay ofertas</Text>}
               
              <Text style={stylesNurse.MessageText2}>Esas son todas las solicitudes actualmente disponibles...</Text>
             
           </ScrollView>
        </View>

    )
}

export default NurseScreen;