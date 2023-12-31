import React , { useEffect, useState }from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList} from 'react-native';
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
import ListOfComplaints from './ListOfComplaints.js';
import ListOfResignations from './ListOfResignations.js';


const AdminScreen = () => {
    //----------------------------ESTADOS-------------------------\\
    const [mostrarBotones, setMostrarBotones] = useState(true);
    const [mostrarRenuncia, setMostrarRenuncia] = useState(false);
    const [mostrarServicios, setMostrarServicios] = useState(false);
    const [mostrarQuejas, setMostrarQuejas] = useState(false);
    const n = useNavigation();

    const [noshowDates, setShowDates] = useState(false);
    const[myuser, setuser] = useState("");
        var muser="";
    const getLocalUser =async()=>{
        if(noshowDates){
            setuser("");
                return;
        }
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

    let closeSession=async ()=>{
        n.replace("StartPage");
              
          AsyncStorage.clear();
    }
    // --------------------FUNCIONES PARA CAMBIAR ENTRE ESTADOS----------------\\
    const volverAlEstadoPrincipal = () => {
        setMostrarBotones(true);
        setMostrarRenuncia(false); 
        setMostrarServicios(false);
        setMostrarQuejas(false);
                
    };
    const EstadoRenuncia = () => {
        setMostrarBotones(false);   
        setMostrarRenuncia(true);
        setMostrarServicios(false);
        setMostrarQuejas(false);
    };
    const EstadoServicios = () => {
        setMostrarBotones(false);  
        setMostrarRenuncia(false); 
        setMostrarServicios(true);
        setMostrarQuejas(false);
    };
    const EstadoQuejas = () => {
        setMostrarBotones(false);  
        setMostrarRenuncia(false); 
        setMostrarServicios(false);
        setMostrarQuejas(true);
    };
    //--------------------------------------------------------------------------\\
    return (
        <View style = {stylesAdmin.container}>
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
           
            
   

            <View style = {stylesAdmin.container3}>
                <ScrollView style={{width:"100%"}}>
                    {mostrarBotones && (
                        <>
                        <View style={stylesNurse.containerHorizontal}>
                        <TouchableOpacity onPress={EstadoRenuncia} style={stylesAdmin.btnButton1}>
                                <Entypo name="text-document" size={45} color="black" style={stylesAdmin.btnIcons} />
                                <Text style={stylesAdmin.btnText}>Solicitud Renuncia</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={EstadoServicios} style={stylesAdmin.btnButton2}>
                                <FontAwesome5 name="servicestack" size={45} color="black" style={stylesAdmin.btnIcons} />
                                <Text style={stylesAdmin.btnText}>Servicios</Text>
                            </TouchableOpacity>
                        </View>
                           
                           <View style={stylesNurse.containerHorizontal}>
                          
                            <TouchableOpacity onPress={() => n.navigate("UserList")} style={stylesAdmin.btnButton3}>
                                <FontAwesome5 name="users" size={50} color="black" style={stylesAdmin.btnIcons} />
                                <Text style={stylesAdmin.btnText}>Usuarios</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => n.navigate("NurseList")} style={stylesAdmin.btnButton4}>
                                <FontAwesome5 name="user-nurse" size={50} color="black" style={stylesAdmin.btnIcons} />
                                <Text style={stylesAdmin.btnText}>Enfermeras</Text>
                            </TouchableOpacity>
                           </View>
                           

                           <View style={stylesNurse.containerHorizontal}>
                           <TouchableOpacity onPress={() => {setShowDates(true); setuser("");  n.navigate("Reports")}} style = {stylesAdmin.btnButton4}>                   
                                <Entypo name="bar-graph" size={50} color="black" style={stylesAdmin.btnIcons}/>
                                <Text style = {stylesAdmin.btnText}>Reportes Generales</Text>   
                            </TouchableOpacity>
                            <TouchableOpacity onPress={EstadoQuejas} style={stylesAdmin.btnButton4}>
                                <Entypo name="text-document" size={45} color="black" style={stylesAdmin.btnIcons} />
                                <Text style={stylesAdmin.btnText}>Quejas</Text>
                            </TouchableOpacity>
                           </View>
                           
                           
                            
                        </>
                    )}   
                    {mostrarRenuncia && (
                        <>
                            <TouchableOpacity onPress={volverAlEstadoPrincipal} style={stylesAdmin.btnReturn}>                     
                                <Text style={stylesAdmin.btnTextReturn}>Volver</Text>
                            </TouchableOpacity>
                            <ListOfResignations/>
                            
                        </>
                    )} 
                    {mostrarServicios && (
                        <>
                            <View style={stylesNurse.containerHorizontal}>
                                <TouchableOpacity onPress={volverAlEstadoPrincipal} style={stylesAdmin.btnReturn2}>                     
                                    <Text style={stylesAdmin.btnTextReturn}>Volver</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => n.navigate("ServiceForm",{service:0})} style={stylesAdmin.btnAddServices}>                     
                                    <Ionicons name="add-circle" size={45} color="white" />
                                </TouchableOpacity>
                            </View>
                            <ServicesList/> 
                        </>
                    )}
                    {mostrarQuejas && (
                        <>
                            <TouchableOpacity onPress={volverAlEstadoPrincipal} style={stylesAdmin.btnReturn2}>                     
                                <Text style={stylesAdmin.btnTextReturn}>Volver</Text>
                            </TouchableOpacity>
                            
                            <ListOfComplaints/> 
                        </>
                    )}
                </ScrollView>              
            </View>
            
               
               
        </View>
    )
}

export default AdminScreen;