import React , { useEffect, useState }from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList, Modal, Pressable} from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import logo from '../../assets/images/GeneralImages/logo.png'
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ServicesList from './ListofServices.js';
import { useNavigation, useRoute } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataUserList from '../../Data/DataUserList.js';
import User from '../../Models/User.js';


const UserList = () => {
    //----------------------------ESTADOS-------------------------\\
  

    const[myuser, setuser] = useState("");
        var muser="";

    const [users, setUsers] = useState("");
    const [reload, setReload] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [id , setId] = useState("");



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
        getUsers();
    }, [reload])


    var myUsers = [];
    let getUsers = async() => {
        let h = new DataUserList();
        myUsers = await h.getUsers();
        setUsers(myUsers);
        console.log(getUsers);
    }

    //da de baja a un usuario
    const deleteUser = async (userId) => {
        try {
          var userr = new DataUserList();
          userr.updateChangeStatus(userId);
          setReload(!reload);
          setModalVisible(false);
        } catch (error) {
          console.error("Error al eliminar al usuario", error);
        }
      };

    let closeSession=async ()=>{
              
        AsyncStorage.clear();
        n.replace("StartPage");
    }
    
    //--------------------------------------------------------------------------\\
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
           
            <View style = {stylesAdmin.container4}>
                <Text style={stylesAdmin.textCorporationTitle}>Corporacion</Text>
                <Text style={stylesAdmin.textCorporation}>Servicios de vida al 100%</Text>
                <Image
                    source={logo}
                    style = {stylesAdmin.image}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {    
                setModalVisible(!modalVisible);
                }}>
                <View >
                    <View style={stylesAdmin.container7}>
                        <Text  style={stylesAdmin.textMessage}>Esta seguro de que desea dar de baja a este usuario?</Text>
                        <Pressable
                            style={stylesAdmin.btnCancel}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={stylesAdmin.textCancel}>Cancelar</Text>
                        </Pressable>
                        <Pressable  
                            style={stylesAdmin.btnAccept}
                            onPress={() => deleteUser(id)}>
                            <Text style={stylesAdmin.textAccept}>Eliminar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>


            <View style = {stylesAdmin.container3}>
                <ScrollView style = {stylesAdmin.scrollContainer}>
                    {users.length > 0?

                    users.map((item) =>(

                        <View style = {stylesAdmin.containerUserDetail} key={item.id}>
                        
                            <Text style = {stylesAdmin.textDetailUser}>Nombres: <Text style = {{fontWeight: 'normal'}}>{item.names + " " + item.lastName + (item.secondLastName ? " " + item.secondLastName : "")}</Text></Text>               
                            <Text style = {stylesAdmin.textDetailUser}>Ci: <Text style = {{fontWeight: 'normal'}}>{item.ci != ""? item.ci : "no registrado"}</Text></Text>
                            <Text style = {stylesAdmin.textDetailUser}>Correo: <Text style = {{fontWeight: 'normal'}}>{item.email}</Text></Text>
                            <Text style = {stylesAdmin.textDetailUser}>Celular: <Text style = {{fontWeight: 'normal'}}>{item.phone}</Text></Text>
                            <Text style = {stylesAdmin.textDetailUser}>Fecha de registro: <Text style = {{fontWeight: 'normal'}}></Text></Text>
                            <TouchableOpacity 
                                onPress={() => {setId(item.id); setModalVisible(true)}}
                                style = {stylesAdmin.btnChangeStatus}>
                               <Text style = {stylesAdmin.textChangeStatus}>Dar de baja</Text>
                           </TouchableOpacity>
                        </View>
                    )) 

                   
                   :<Text>No hay usuario en el sistema</Text>
                    }
                </ScrollView> 
            </View>      
        </View>
    )
}

export default UserList;