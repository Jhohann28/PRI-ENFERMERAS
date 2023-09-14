//without integration

import React , { useEffect, useState }from 'react';
import {View, Text, Image, TouchableOpacity, Alert,Modal,Linking} from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import logo from '../../assets/images/GeneralImages/logo.png'
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataJobRequest from '../../Data/DataJobRequest.js';

const AcceptContactDeclineRequest = () => {
    
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
    })


    const [typeAction, setTypeA]= useState(-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [idRequest, setIdRequest] = useState("");




    const makeAction = async()=>{
        let t = typeAction;
        switch (t){
            case 2:
                let d = new DataJobRequest();
                 let r= await d.contactNurse(idRequest);

                 await Linking.openURL("tel:"+r.data().phone);

            break;
        }
        
    }
    return (
        <View style = {stylesAdmin.container}>
            <View style = {stylesAdmin.container2}>
                <Text style={stylesAdmin.texto}>Bienvenido</Text>
                <Text style={stylesAdmin.texto1}>{myuser!=""? myuser.personRef.names:""}</Text>
                <Image
                    source={profile}
                    style = {stylesAdmin.image}
                />
            </View>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                    <View >
                    <View>
                        <TouchableOpacity
                        
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text >Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        
                        onPress={() => { makeAction("");  setModalVisible(!modalVisible)}}>
                        <Text >Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>



            <View style = {stylesAdmin.container4}>
                <Text style={stylesAdmin.textCorporationTitle}>Corporacion</Text>
                <Text style={stylesAdmin.textCorporation}>Servicios de vida al 100%</Text>
                <Image
                    source={logo}
                    style = {stylesAdmin.image}
                />
            </View>
            
                <TouchableOpacity onPress={() =>{setTypeA(1);setIdRequest("12"); setModalVisible(true); }} style = {stylesAdmin.btnButton1}>                   
                    <Entypo name="text-document" size={45} color="black" style={stylesAdmin.btnIcons}/>
                    <Text style = {stylesAdmin.btnText}>Aceptar</Text>  
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{setTypeA(2); setIdRequest("AHh5VGEoxocTrW2AlpqP");setModalVisible(true)}} style = {stylesAdmin.btnButton2}>                   
                    <MaterialIcons name="payment" size={60} color="black" style={stylesAdmin.btnIcons}/>
                    <Text style = {stylesAdmin.btnText}>Contactar</Text>   
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{setTypeA(3); setModalVisible(true)}} style = {stylesAdmin.btnButton3}>                   
                    <FontAwesome5 name="users" size={50} color="black" style={stylesAdmin.btnIcons}/> 
                    <Text style = {stylesAdmin.btnText}>Rechazar</Text>   
                </TouchableOpacity>
                
        </View>
    )
}

export default AcceptContactDeclineRequest;