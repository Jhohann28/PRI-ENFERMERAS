import React , { useEffect, useState }from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList, Linking} from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import logo from '../../assets/images/GeneralImages/logo.png'
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ServicesList from './ListofServices.js';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import ListNurseData from '../../Data/LisNurseData.js';
const NurseList = () => {
   
    const[myuser, setuser] = useState("");
        var muser="";

    const[nurses, setNurses] = useState([]);

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
    },[])

    useEffect(()=>{
        mgetNurses();
    },[]);
    var myNurses =[];
    let mgetNurses= async()=>{
        let h = new ListNurseData();
        myNurses = await h.getNurses();
        console.log(myNurses);
         setNurses(myNurses);
    }




    let closeSession=async ()=>{
              
          AsyncStorage.clear();
        n.replace("StartPage");
    }
   
    const handleLinkPress = (url) => {
   
        Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
      
      };
    return (
        <View style = {stylesAdmin.container}>
            <View style = {stylesAdmin.container2}>
                <Text style={stylesAdmin.texto}>Lista de Enfermeras</Text>
                <Text style={stylesAdmin.texto1}>{myuser!=""? myuser.personRef.names:""}</Text>
                <Image
                    source={profile}
                    style = {stylesAdmin.image}
                />
                  <View style = {stylesAdmin.container4}>
                <Text style={stylesAdmin.textCorporationTitle}>SISEEM</Text>
                <Text style={stylesAdmin.textCorporation}>Servicios de vida al 100%</Text>
                <Image
                    source={logo}
                    style = {stylesAdmin.image}
                />
            </View>
            </View>
           
          
   

            <View style = {stylesAdmin.container3}>
                <ScrollView style={stylesNurse.myScroll}>
                {nurses.length>0?  
                
                nurses.map((item)=>(

                    <View style={stylesNurse.myAtentionRequestItem}  key={item.id}  >
                    <View style={stylesNurse.containerHorizontal}
                    >
                        <FontAwesome5 name="user-nurse" size={44} color="black"  />
                      <View></View>
                        <View  style={stylesNurse.containerHorizontal2}
                        >
                            
                              <Text style={stylesNurse.left} >Nombre:<Text style={{fontWeight:"normal"}} > {item.names+" "+item.lastName} </Text> </Text>
                              <Text  style={stylesNurse.left}>CI: <Text style={{fontWeight:"normal"}} > {item.ci}</Text></Text>
    
                                      
                                
                                <View style={  stylesNurse.containerHorizontal3}
                                    >
                                        <Text style={stylesNurse.left} >{item.phone}<Text style={{fontWeight:"normal"}} ></Text> | </Text>
                                        <Text  style={stylesNurse.left}>{item.email}<Text style={{fontWeight:"normal"}} ></Text> </Text>
    
                                      
                                </View>
    
                                <View style={stylesNurse.containerHorizontal3}
                                    >
                                        <Text  style={stylesNurse.left}>Institución de egreso: <Text style={{fontWeight:"normal"}} >  {item.graduationInstitution}</Text> </Text>
    
                                </View>
                              <Text  style={stylesNurse.left}>Fecha Egreso: <Text style={{fontWeight:"normal"}} > {item.titulationDate} </Text></Text>
    
                                <Text  style={stylesNurse.left}>Especialidad: <Text style={{fontWeight:"normal"}} > {item.speciality}</Text></Text>
                                <View style={  stylesNurse.containerHorizontal3}
                                    >
                                        <Text style={stylesNurse.left} >N° Atenciones:<Text style={{fontWeight:"normal"}} > {item.quantityAtentions}</Text>  </Text>
    
                                      
                                </View>
                                <Text  style={stylesNurse.left}>Recaudado Bs:<Text style={{fontWeight:"normal"}} > {item.amount}</Text> </Text>
    
                               <TouchableOpacity onPress={()=>handleLinkPress(item.curriculum)}><Text  style={{color:"blue", alignSelf:"center", margin:4}}>Ver Curriculum <Text style={{fontWeight:"normal"}} ></Text></Text></TouchableOpacity> 
    
    
                                <View style={stylesNurse.containerHorizontalButtons}>
                                      <TouchableOpacity style={stylesNurse.btnAccept}>
                                          <Text style={{textAlign:"center", fontWeight:"bold", fontSize:15}}>Contactar</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity style={stylesNurse.btnRemove}>
                                          <Text  style={{textAlign:"center", fontWeight:"bold", fontSize:15, color:"white"}}   >Dar de Baja</Text>
                                      </TouchableOpacity>
      
                              </View>
                        </View>
                    </View>
                    <View style={stylesNurse.containerHorizontalButtons}>
                           
                           
    
                    </View>
                    </View>

                ))
                
                 :
                 <Text>No hay enfermeras en el sistema</Text>
            
            
            
                
            
                }


               
                </ScrollView>
            </View>
            
               
               
        </View>
    )
}

export default NurseList;