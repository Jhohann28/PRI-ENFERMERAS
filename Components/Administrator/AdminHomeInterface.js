import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList} from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import logo from '../../assets/images/GeneralImages/logo.png'
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ServicesList from './ListofServices.js';

const AdminScreen = () => {
    //----------------------------ESTADOS-------------------------\\
    const [mostrarBotones, setMostrarBotones] = useState(true);
    const [mostrarRenuncia, setMostrarRenuncia] = useState(false);
    const [mostrarServicios, setMostrarServicios] = useState(false);

    // --------------------FUNCIONES PARA CAMBIAR ENTRE ESTADOS----------------\\
    const volverAlEstadoPrincipal = () => {
        setMostrarBotones(true);
        setMostrarRenuncia(false); 
        setMostrarServicios(false);
                
    };
    const EstadoRenuncia = () => {
        setMostrarBotones(false);   
        setMostrarRenuncia(true);
        setMostrarServicios(false);
    };
    const EstadoServicios = () => {
        setMostrarBotones(false);  
        setMostrarRenuncia(false); 
        setMostrarServicios(true);
    };
    //--------------------------------------------------------------------------\\
    return (
        <View style = {stylesAdmin.container}>
            <View style = {stylesAdmin.container2}>
                <Text style={stylesAdmin.texto}>Hello</Text>
                <Text style={stylesAdmin.texto1}>Linda Valencia</Text>
                <Image
                    source={profile}
                    style = {stylesAdmin.image}
                />
            </View>
           
            <View style = {stylesAdmin.container4}>
                <Text style={stylesAdmin.textCorporationTitle}>Corporacion</Text>
                <Text style={stylesAdmin.textCorporation}>Servicios de vida al 100%</Text>
                <Image
                    source={logo}
                    style = {stylesAdmin.image}
                />
            </View>
   

            <View style = {stylesAdmin.container3}>
                <ScrollView>
                    {mostrarBotones && (
                        <>
                            <TouchableOpacity onPress={EstadoRenuncia} style={stylesAdmin.btnButton1}>
                                <Entypo name="text-document" size={45} color="black" style={stylesAdmin.btnIcons} />
                                <Text style={stylesAdmin.btnText}>Solicitud Renuncia</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={EstadoServicios} style={stylesAdmin.btnButton2}>
                                <FontAwesome5 name="servicestack" size={45} color="black" style={stylesAdmin.btnIcons} />
                                <Text style={stylesAdmin.btnText}>Servicios</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style={stylesAdmin.btnButton3}>
                                <FontAwesome5 name="users" size={50} color="black" style={stylesAdmin.btnIcons} />
                                <Text style={stylesAdmin.btnText}>Usuarios</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style={stylesAdmin.btnButton4}>
                                <FontAwesome5 name="user-nurse" size={50} color="black" style={stylesAdmin.btnIcons} />
                                <Text style={stylesAdmin.btnText}>Enfermeras</Text>
                            </TouchableOpacity>
                        </>
                    )}   
                    {mostrarRenuncia && (
                        <>
                            <TouchableOpacity onPress={volverAlEstadoPrincipal} style={stylesAdmin.btnReturn}>                     
                                <Text style={stylesAdmin.btnTextReturn}>Vover</Text>
                            </TouchableOpacity>

                            <View style = {stylesAdmin.container5}>
                                <Text style = {stylesAdmin.textName}>Ana Villarroel</Text>
                                <Text style = {stylesAdmin.textReason}>Bla bla Bla bla blaBla blaBla bla bla Bla bla blabla Bla bla Bla bla blaBla blaBla bla bla Bla bla blabla  </Text>
                                
                                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style={stylesAdmin.btnContact}>
                                    
                                    <Text style={stylesAdmin.btnTextReason}>Contactar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style={stylesAdmin.btnUnsubscribe}>
                                    
                                    <Text style={stylesAdmin.btnTextReason}>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style={stylesAdmin.btnDecline}>
                                    
                                    <Text style={stylesAdmin.btnTextReason}>Rechazar</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )} 
                    {mostrarServicios && (
                        <>
                            <TouchableOpacity onPress={volverAlEstadoPrincipal} style={stylesAdmin.btnReturn2}>                     
                                <Text style={stylesAdmin.btnTextReturn}>Vover</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Alert.alert('Debe ir al formulario de agregar servicio')} style={stylesAdmin.btnAddServices}>                     
                                <Ionicons name="add-circle" size={45} color="black" />
                            </TouchableOpacity>
                            <ServicesL-ist/> 
                        </>
                    )}
                </ScrollView>              
            </View>
            
        </View>
    )
}

export default AdminScreen;