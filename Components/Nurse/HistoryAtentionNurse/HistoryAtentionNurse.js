import React, { useEffect, useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { stylesNurse } from '../../../Styles/NurseStyles.js';
import {Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

import firebase from 'firebase/app';
import appFirebase  from "../../../Data/firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot, orderBy} from "firebase/firestore";
import MapMaker from '../../../Tools/Maper.js';
import { useNavigation } from '@react-navigation/native';
import HistoryNurseData from '../../../Data/HistoryNurseData/HistoryNurseData.js';

const db = getFirestore(appFirebase);

const HistoryAtentionNurse = () => {
    const[myuser, setuser] = useState("");
    const [atentions, setAtention]= useState([]);

      const [inputFilter, setInputFilter]= useState("");  




    const n = useNavigation();
   
   
    var muser="";
    const getLocalUser =async()=>{

        try{
                muser = await AsyncStorage.getItem("user");
                let muserJson = muser? JSON.parse(muser): null;
                setuser(muserJson);
                await GetListOfAtentions();
        }
        catch(e){
            console.error(e);
        }
    }
    useEffect(()=>{
        getLocalUser();
        

    },[])

     
    
      const OpenALot=(aten)=>{
        
        n.navigate("MyAtentionNurseOpen", {atentionn: aten})
      }


      const GetListOfAtentions=async()=>{
        let r = new HistoryNurseData();
       let n =  await r.getAtentionListFormattedByNurse(myuser.userAuthID);

        setAtention(n);
      }



    return (
        <View style = {stylesNurse.container}>
           <View style = {stylesNurse.container2}>

                <Text style={stylesNurse.texto}>Historial de Atenciones Brindadas</Text>
                <Text style={stylesNurse.texto1}>{myuser!=""? myuser.personRef.names+" "+ myuser.personRef.lastName :""}</Text>
                
                <MaterialIcons name="account-circle" size={74} color="black"  style = {stylesNurse.image} />
                <TextInput
                    style = {stylesNurse.inputSearch}
                    placeholder="Realice una búsqueda filtrada"  
                    onChangeText={(text)=>setInputFilter(text)} value={inputFilter}                 
                />

                <Ionicons name="search" size={30} color="black" style ={stylesNurse.iconSearch} />
                <Text style={stylesNurse.texto2}>Atenciones Brindadas</Text>
           </View>
           <TouchableOpacity onPress={()=>GetListOfAtentions()}><Text style={{alignSelf:"center", backgroundColor:"#56D782", borderRadius:10, margin:10, width:"80%", textAlign:"center"}}>Recargar</Text></TouchableOpacity>
           <ScrollView style={stylesNurse.myScroll}>
             
             {atentions.length>0?
             
             atentions.map( (atention)=>{

                   if(inputFilter != ""){
                    if(!atention.clientRef.names.includes(inputFilter) && !atention.clientRef.lastName.includes(inputFilter)
                   && !atention.date.includes(inputFilter) && !atention.serviceRef.name.includes(inputFilter)
                   && atention.aditionalCost!=inputFilter && atention.serviceCurrentCost!= inputFilter
                   && atention.aditionalCost+atention.serviceCurrentCost!= inputFilter
                   && !atention.adress.includes(inputFilter)
                   
                    ){
                        return;
                    }
                   } 

                return(
                <View style={stylesNurse.myAtentionRequestItem} key={atention.id} >
                <View style={stylesNurse.containerHorizontal}
                >
                    <FontAwesome5 name="hospital-user" size={44} color="black"  />
                  <View></View>
                    <View  style={stylesNurse.containerHorizontal2}
                    >
                        
                          <Text style={stylesNurse.left} >Cliente:<Text style={{fontWeight:"normal"}} > {atention.clientRef.names+" "+atention.clientRef.lastName} </Text> </Text>
                          <Text  style={stylesNurse.left}>Servicio: <Text style={{fontWeight:"normal"}} >{atention.serviceRef.name}</Text></Text>

                                  
                            
                            <Text  style={stylesNurse.left}>Total: <Text style={{fontWeight:"normal"}} >{atention.aditionalCost+ atention.serviceCurrentCost}</Text> Bs.</Text>
                            <View style={  stylesNurse.containerHorizontal3}
                                >
                                    <Text style={stylesNurse.left} >Precio Servicio:<Text style={{fontWeight:"normal"}} >{atention.serviceCurrentCost}</Text> | </Text>
                                    <Text  style={stylesNurse.left}>Adicional:<Text style={{fontWeight:"normal"}} >{atention.aditionalCost}</Text> </Text>

                                  
                            </View>

                            <View style={stylesNurse.containerHorizontal3}
                                >
                                    <Text  style={stylesNurse.left}>Dirección: <Text style={{fontWeight:"normal"}} >{atention.adress}</Text> </Text>

                            </View>
                    </View>
                </View>
                <View style={{alignSelf:"center"}}><Text style={{textAlign:"center"}} >Fecha: {atention.date}</Text></View>
                <View style={stylesNurse.containerHorizontalButtons}>
                        <TouchableOpacity style={stylesNurse.btnAccept2} onPress={()=>OpenALot(atention)}>
                            <Text style={{textAlign:"center", fontWeight:"bold", fontSize:15}}>Ampliar</Text>
                        </TouchableOpacity>
                       

                </View>
                </View>
                
                )})

             

             
             
             
             :<Text>No hay atenciones brindadas</Text>}



           
           </ScrollView>
        </View>

    )
}

export default HistoryAtentionNurse;


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