import React , { useEffect, useState }from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import logo from '../../assets/images/GeneralImages/logo.png'
import {Ionicons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ServicesList from './ListofServices.js';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import DataAtentionsAdmin from '../../Data/DataAtentionsAdmin.js';
import { TextInput } from 'react-native-gesture-handler';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import DataAdminServiceRequest from '../../Data/DataAdminServiceRequest.js';
import firebase from 'firebase/app';
import appFirebase  from "../../Data/firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot, orderBy} from "firebase/firestore";
import MapMaker from '../../Tools/Maper.js';


const db = getFirestore(appFirebase);
const AdminAtentionRequestList = () => {
    
    const n = useNavigation();

    const [loading, setLoading] = useState(false);
    const[myuser, setuser] = useState("");
    const[requests, SetRequests]= useState([]);
        var muser="";

    var dtN = new DataAdminServiceRequest();

        const susc = async () => {
            try {
              const q = query(collection(db, "AtentionRequest") ,  orderBy("date", "desc"));
              
              const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                const rr = [];
                setLoading(true);
                const promises = querySnapshot.docs.map(async (doc) => {
                  let service = await dtN.getServiceAtention(doc.data());
                  let user = await dtN.getUserAtention(doc.data());
                  user.personRef = await dtN.getPersonAtention(user);
                var userNurse ="";
                  if(doc.data().status>=3){
                     userNurse = await dtN.getUserNurseAtention(doc.data());
                    userNurse.personRef =  await dtN.getPersonAtention(userNurse);
                  }
                  let myAuxReq = dtN.getAtentionsRequestToShow(doc.data(), doc, service, user, userNurse);
    
                  let maper = new MapMaker();
                  myAuxReq.directionName = await maper.getAddressFromCoordinates(myAuxReq.userRef.location.latitude,myAuxReq.userRef.location.longitude);
                  console.log(myAuxReq.nurse);
                  rr.push(myAuxReq);
                }); 
                await Promise.all(promises);
      
                  
                console.log(requests.length);
                SetRequests(rr);
               setLoading(false);
          
                console.log(rr.length);
              });
            } catch (error) {
            }
          };
              
    const getLocalUser =async()=>{
        
        try{
                muser = await AsyncStorage.getItem("user");
                let muserJson = muser? JSON.parse(muser): null;
                setuser(muserJson);
        }
        catch(e){
            console.error(e);
            setuser("");
        }
    }

  



    useEffect(()=>{
        getLocalUser();
        susc();
    },[])
  
    const OpenALot = (atention)=>{
            n.navigate("AtentionOpenAdmin", {atention: atention})
    }
   const seeAtention=async(ref)=>{
    setLoading(true);
    let dt= new DataAtentionsAdmin();
   let atentionRequest=  await dt.getAnAtenionByReference(ref);
   n.navigate("AtentionByRef", {atentionn: atentionRequest});
setLoading(false);

   }

    return (
        <View style = {stylesAdmin.container}>
              <View style = {stylesAdmin.container2}>
                <Text style={stylesAdmin.texto}>Solicitudes de Atención</Text>
                <Text style={stylesAdmin.texto1}>{myuser!=""? myuser.personRef.names:""}</Text>
                <Ionicons name="ios-person-circle-outline" size={74} color="white" style={stylesAdmin.image} />
                  <View style = {stylesAdmin.container4}>
                <View style={stylesNurse.containerHorizontal}>
                    <Text style={stylesAdmin.textCorporationTitle}>SISEEM</Text>
                    <Image
                        source={logo}
                    style={{width:70, height:70, alignSelf:"flex-end", marginLeft:120}}
                    />
                </View>
              
                 
              
               
            </View>
            </View>
            <View style = {stylesAdmin.container3}>
                <ScrollView style={stylesNurse.myScroll}>
                {loading && <ActivityIndicator size="large" color="white"  />} 
                { requests.length>0?
              requests.map((requestss, k) => {
                     
                        return(
                          <TouchableOpacity style={stylesNurse.myAtentionRequestItem} key={requestss.id}>
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

                                      <Text  style={{color: dtN.getDescriptionByStatus(requestss.status).split(";")[1],    alignSelf:"flex-start" , fontSize:18, fontWeight:"bold"}}>{dtN.getDescriptionByStatus(requestss.status).split(";")[0]}</Text>
                                      <View style={stylesNurse.containerHorizontal}
                                          >
                                            {requestss.status == 1 || requestss.status ==2 ?
                                             <Text  style={stylesNurse.left}>{requestss.directionName}</Text>:
                                             <Text  style={stylesNurse.left}>Respondido por: Lic. {requestss.nurse.personRef.names.split(" ")[0]+" "+requestss.nurse.personRef.lastName}</Text>
                                             }
                                            
  
                                      </View>
                              </View>
                          </View>
                          <View style={{alignSelf:"center"}}><Text style={{textAlign:"center"}} >{requestss.date}</Text></View>

                           {requestss.status == 1? <View style={stylesNurse.containerHorizontalButtons}>
                                  <TouchableOpacity style={stylesNurse.btnAccept} onPress={()=>OpenALot(requestss)}>
                                      <Text style={{textAlign:"center", fontWeight:"bold", fontSize:15}}>AMPLIAR</Text>
                                  </TouchableOpacity>
                                 
  
                          </View>:""}                   
                          
                          {requestss.status == 6?
                          <View style={stylesNurse.containerHorizontalButtons}>
                          <TouchableOpacity style={stylesNurse.btnAccept} onPress={()=> seeAtention(requestss.atentionRef)}>
                              <Text style={{textAlign:"center", fontWeight:"bold", fontSize:15}}>Ver Atención</Text>
                          </TouchableOpacity>
                         

                         </View>:""
                        }
                          
                          </TouchableOpacity>
                        )
                       }
                       
             ): <Text style={{color:"white", alignSelf:"center"}}>No hay ofertas</Text>}
                </ScrollView>



           </View>
        </View>
    )
}
export default AdminAtentionRequestList;