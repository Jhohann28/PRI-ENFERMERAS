import React from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const AdminScreen = () => {
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
            <View style = {stylesAdmin.container3}>

                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style = {stylesAdmin.btnJobApplications}>                   
                    <MaterialIcons name="work" size={30} color="black" />   
                    <Text style = {stylesAdmin.btnText}>Solicitud Trabajo</Text>  
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style = {stylesAdmin.btnAttentionRequest}>                   
                    <Ionicons name="documents" size={30} color="black" />
                    <Text style = {stylesAdmin.btnText}>Solicitud Atencion</Text>   
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style = {stylesAdmin.btnAttentions}>                   
                    <FontAwesome5 name="user-shield" size={30} color="black" style={stylesAdmin.btnIcons}/>
                    <Text style = {stylesAdmin.btnText}>Atenciones</Text>   
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style = {stylesAdmin.btnHome}>                   
                    <Entypo name="home" size={30} color="black" style={stylesAdmin.btnIcons}/>
                    <Text style = {stylesAdmin.btnText}>Home</Text>   
                </TouchableOpacity>

            </View>
            <View style = {stylesAdmin.container4}>
                <Text style={stylesAdmin.textCorporationTitle}>Corporacion</Text>
                <Text style={stylesAdmin.textCorporation}>Servicios de vida al 100%</Text>
                <Image
                    source={profile}
                    style = {stylesAdmin.image}
                />
            </View>
                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style = {stylesAdmin.btnButton1}>                   
                    <Entypo name="text-document" size={45} color="black" style={stylesAdmin.btnIcons}/>
                    <Text style = {stylesAdmin.btnText}>Solicitud Renuncia</Text>  
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style = {stylesAdmin.btnButton2}>                   
                    <MaterialIcons name="payment" size={60} color="black" style={stylesAdmin.btnIcons}/>
                    <Text style = {stylesAdmin.btnText}>Pagos</Text>   
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style = {stylesAdmin.btnButton3}>                   
                    <FontAwesome5 name="users" size={50} color="black" style={stylesAdmin.btnIcons}/> 
                    <Text style = {stylesAdmin.btnText}>Usuarios</Text>   
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert('Mostrando Usuarios')} style = {stylesAdmin.btnButton4}>                   
                    <FontAwesome5 name="user-nurse" size={50} color="black" style={stylesAdmin.btnIcons}/>
                    <Text style = {stylesAdmin.btnText}>Enfermeras</Text>   
                </TouchableOpacity>
        </View>
    )
}

export default AdminScreen;