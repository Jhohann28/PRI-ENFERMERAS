import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert, Modal, Pressable, TextInput, ScrollView } from 'react-native';
import { styles } from '../../Styles/UserStyles.js'; // Debería ser 'style', no 'Styles'
import {Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5, FontAwesome, AntDesign    } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { profileStyle } from "../../Styles/ProfileStyles.js";
import DataGeneralProfile from "../../Data/DataGeneralProfile.js";
import User from "../../Models/User.js";

const GeneralProfile = () => {
   
    const n = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [editName, setEditName] = useState(false);
    const [editLastName, setEditLastName] = useState(false);
    const [editCi, setEditCi] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    //contraseña estados
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    
    const [dis, setDis] = useState(true);

    const [name, setName] = useState("");
    const [lastName, setLasName] = useState("");
    const [ci, setCi] = useState("");
    const [phone, setPhone] = useState("");
    
    const [watchPorfile, setWatchProfile] = useState(true);
    //estados para las validaciones
    const [nameError, setNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [ciError, setCiError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    //controlar el boton de guardar cambios
    const [editsMade, setEditsMade] = useState(false);

    const[myuser, setuser] = useState("");
        var muser="";
    const getLocalUser =async()=>{
        try{
                muser = await AsyncStorage.getItem("user");
                let muserJson = muser? JSON.parse(muser): null;
                setuser(muserJson);

                setName(muserJson.personRef.names);
                setLasName(muserJson.personRef.lastName);
                setCi(muserJson.personRef.ci);
                setPhone(muserJson.personRef.phone);   
        }
        catch(e){
            console.error(e);
        }
    }

    //aqui van las validaciones

    const validateName = (inputName) => {
        const namePattern =/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
        if (!namePattern.test(inputName)) {
            setNameError("El nombre solo debe contener letras y espacios.");
            setEditsMade(true);
            return false;
        }
        setNameError("");
        return true;
    };

    const validateLastName = (inputLastName) => {
        const lastNamePattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/; 
        if (!lastNamePattern.test(inputLastName)) {
            setLastNameError("El apellido solo debe contener letras y espacios.");
            setEditsMade(true);
            return false;
        }
        setLastNameError("");
        return true;
    };

    const validateCI = (inputCI) => {
        const ciPattern = /^[0-9]{8}$/; 
        if (!ciPattern.test(inputCI)) {
            setCiError("El CI debe contener solo dígitos.");
            setEditsMade(true);
            return false;
        }
        setCiError("");
        return true;
    };

    const validatePhone = (inputPhone) => {
        const phonePattern = /^[0-9]{8}$/; 
        if (!phonePattern.test(inputPhone)) {
            setPhoneError("El teléfono debe contener solo dígitos.");
            setEditsMade(true);
            return false;
        }
        setPhoneError("");
        return true;
    };

   // Función para validar la contraseña anterior
    const validateOldPassword = (inputOldPassword) => {
        const pattnerOldPassword = /^(?!\s*$).+/;
        if (!pattnerOldPassword.test(inputOldPassword)) {
            setOldPasswordError("Ingrese la contraseña anterior");
            return false;
        }
        setOldPasswordError("");
        return true;
    };

    // Función para validar la nueva contraseña
    const validateNewPassword = (inputNewPassword) => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        
        if (!passwordPattern.test(inputNewPassword)) {
            setNewPasswordError("La nueva contraseña debe tener al menos 8 caracteres y cumplir con los requisitos de seguridad.");
            return false;
        }
        setNewPasswordError("");
        return true;
    };
   
    const canIChange = ()=>{
        const isNameValid = validateName(name);
        const isLastNameValid = validateLastName(lastName);
        const isCiValid = validateCI(ci);
        const isPhoneValid = validatePhone(phone);
        if(isNameValid && isLastNameValid && isCiValid && isPhoneValid)
        {
            setModalVisible2(true);
        }
      
    }
    
    const sendDates = async () =>{
        let data = { 
            names: name,
            lastName: lastName,
            ci: ci,
            phone: phone
        }
        let d = new DataGeneralProfile();
        await d.saveChangeUser(myuser.userAuthID, data);
        n.navigate("StartPage", {closeSession : true});
    }

    


    const changePSW = async () => {
        // Realizar validaciones de contraseñas
        setConfirmPasswordError("");
        if(newPassword !== confirmPassword){
            setConfirmPasswordError("las contraseñas no coinciden");
            return;
        }

        const isOldPasswordValid = validateOldPassword(oldPassword);
        const isNewPasswordValid = validateNewPassword(newPassword);
    

    if (isNewPasswordValid && isOldPasswordValid) {
        // Realizar el cambio de contraseña
        let e = new DataGeneralProfile();
        let result = await e.authUsers(myuser.personRef.email, oldPassword, newPassword);
        if(result == true){
            Alert.alert("Cambio de contraseña exitosa");
            setModalVisible(!modalVisible)
        }
        else{
            Alert.alert(result);
        }
    }
    else{
        Alert.alert("no se puede Cambiar la contraseña");
    }
  };
    useEffect(()=>{
        getLocalUser();
    },[])
    return(
        <View style={profileStyle.container}> 
           
           {watchPorfile == true ? <View style={profileStyle.container2}>
                <Text style={profileStyle.textHeader}>Perfil</Text> 
                <MaterialIcons name="account-circle" size={150} color="white"  style = {profileStyle.iconProfile} />
                <Text style={profileStyle.textHeader}>{myuser != ""? myuser.personRef.names:"cargando"}</Text>
                <TouchableOpacity onPress={() => n.navigate("StartPage", {closeSession : true})} style = {profileStyle.iconRight}>
                    <AntDesign name="poweroff" size={24} color= {'#03a984'} />
                </TouchableOpacity>    
                
            </View>: ""}   
            <Text style={profileStyle.line}>-------------------------------------------------------------------------------------------------</Text>
            
            <View style={profileStyle.container3}>
                    
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {    
                        setModalVisible(!modalVisible);
                        }}>
                        <View >
                            <View style={profileStyle.container8}>
                                <Text  style={profileStyle.textMessage}>Cambio de contraseña</Text>
                                <TextInput
                                    style={profileStyle.textPasswordAfter}
                                    secureTextEntry={true}
                                    placeholder="Ingrese contraseña contraseña anterior"
                                    value= {oldPassword}
                                    onChangeText={(text) => {
                                        setOldPassword(text);
                                        validateOldPassword(text); 
                                    }}
                                />
                                <Text style={profileStyle.textError}>{oldPasswordError}</Text>
                                <TextInput
                                    style={profileStyle.textChangePassword}
                                    secureTextEntry={true}
                                    placeholder="Ingrese su nueva contraseña"
                                    value= {newPassword}
                                    onChangeText={(text) => {
                                        setNewPassword(text);
                                        validateNewPassword(text);                                      
                                        }}
                                />
                                 <Text style={profileStyle.textError}>{newPasswordError}</Text>
                                 <TextInput
                                    style={profileStyle.textConfirmationPassword}
                                    secureTextEntry={true}
                                    placeholder="Confirme su contraseña"
                                    value= {confirmPassword}
                                    onChangeText={(text) => {
                                        setConfirmPassword(text);  
                                        validateNewPassword(text)                               
                                        }}
                                />
                                <Text style={profileStyle.textError}>{confirmPasswordError}</Text>
                                <Pressable
                                    style={profileStyle.btnCancel}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={profileStyle.textCancel}>Cancelar</Text>
                                </Pressable>
                                <Pressable  
                                    style={profileStyle.btnAccept}
                                    onPress={() => changePSW("")}>
                                    <Text style={profileStyle.textAccept}>Cambiar</Text>
                                </Pressable>
                                 
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {    
                        setModalVisible2(!modalVisible2);
                        }}>
                        <View >
                            <View style={profileStyle.container7}>
                                <Text  style={profileStyle.textMessage}>Esta seguro de cambiar sus datos?, debera volver a iniciar secion</Text>
                                
                                <Pressable
                                    style={profileStyle.btnCancel}
                                    onPress={() => setModalVisible2(!modalVisible2)}>
                                    <Text style={profileStyle.textCancel}>Cancelar</Text>
                                </Pressable>
                                <Pressable  
                                    style={profileStyle.btnAccept}
                                    onPress={async ()=> {sendDates(); }}>
                                    <Text style={profileStyle.textAccept}>Si</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    <ScrollView style={profileStyle.scrollViewContainer}>
                        <View style={profileStyle.container4}>
                            <FontAwesome5 name="user-alt" size={24} color="white" style={profileStyle.iconLeft}/>
                            <Text style={profileStyle.textTitle}>Nombre</Text>
                            {editName == false ? (
                                    <Text style={profileStyle.textDescription}>
                                    {myuser != "" ? myuser.personRef.names : "cargando"}
                                    </Text>
                                ) : (
                                    <>
                                        <TextInput
                                            style={profileStyle.textDescription}
                                            value={name}
                                            onChangeText={(text) => {
                                            setName(text);
                                            validateName(text);
                                            }}
                                        />
                                        <Text style={profileStyle.textError}>{nameError}</Text> 
                                    </>
                                )}
                            <TouchableOpacity onPress={() => {setEditName(true);setName(myuser.personRef.names)}} style={profileStyle.btnChangePassword}>
                                <MaterialCommunityIcons name="pencil" size={30} color={'#03a984'} />
                            </TouchableOpacity>
                            <Text style={profileStyle.line2}>------------------------------------------------------------------------------------</Text>                    
                        </View>
                        <View style={profileStyle.container4}>
                            <FontAwesome5 name="user-alt" size={24} color="white" style={profileStyle.iconLeft}/>
                            <Text style={profileStyle.textTitle}>Apellido</Text>
                            {editLastName == false ? (
                                    <Text style={profileStyle.textDescription}>
                                    {myuser != "" ? myuser.personRef.lastName : "cargando"}
                                    </Text>
                                ) : (
                                    <>
                                        <TextInput
                                            style={profileStyle.textDescription}
                                            value={lastName}
                                            onChangeText={(text) => {
                                            setLasName(text);
                                            validateLastName(text);
                                            }}
                                        />
                                        <Text style={profileStyle.textError}>{lastNameError}</Text> 
                                    </>
                                )}
                            <TouchableOpacity onPress={() => {setEditLastName(true);setLasName(myuser.personRef.lastName)}} style={profileStyle.btnChangePassword}>
                                <MaterialCommunityIcons name="pencil" size={30} color={'#03a984'} />
                            </TouchableOpacity>
                            <Text style={profileStyle.line2}>------------------------------------------------------------------------------------</Text>                    
                        </View>
                        <View style={profileStyle.container4}>
                            <FontAwesome name="address-card" size={26} color="white" style={profileStyle.iconLeft}/>
                            <Text style={profileStyle.textTitle}>CI</Text>
                            {editCi == false ? (
                                    <Text style={profileStyle.textDescription}>
                                    {myuser != "" ? myuser.personRef.ci : "cargando"}
                                    </Text>
                                ) : (
                                    <>
                                        <TextInput
                                            style={profileStyle.textDescription}
                                            value={ci}
                                            onChangeText={(text) => {
                                            setCi(text);
                                            validateCI(text);
                                            }}
                                        />
                                        <Text style={profileStyle.textError}>{ciError}</Text> 
                                    </>
                                )}
                            <TouchableOpacity onPress={() =>  {setEditCi(true);setCi(myuser.personRef.ci)}} style={profileStyle.btnChangePassword}>
                                <MaterialCommunityIcons name="pencil" size={30} color={'#03a984'} />
                            </TouchableOpacity>
                            <Text style={profileStyle.line2}>------------------------------------------------------------------------------------</Text>              
                        </View>
                        
                        <View style={profileStyle.container4}>
                            <FontAwesome name="phone" size={30} color="white" style={profileStyle.iconLeft}/>
                            <Text style={profileStyle.textTitle}>Telefono</Text>
                            {editPhone == false ? (
                                    <Text style={profileStyle.textDescription}>
                                    {myuser != "" ? myuser.personRef.phone : "cargando"}
                                    </Text>
                                ) : (
                                    <>
                                        <TextInput
                                            style={profileStyle.textDescription}
                                            value={phone}
                                            onChangeText={(text) => {
                                            setPhone(text);
                                            validatePhone(text);
                                            }}
                                        />
                                        <Text style={profileStyle.textError}>{phoneError}</Text> 
                                    </>
                                )}
                            <TouchableOpacity onPress={() => {setEditPhone(true);setPhone(myuser.personRef.phone)}} style={profileStyle.btnChangePassword}>
                                <MaterialCommunityIcons name="pencil" size={30} color={'#03a984'} />
                            </TouchableOpacity>
                            <Text style={profileStyle.line2}>------------------------------------------------------------------------------------</Text>               
                        </View>
                        <View style={profileStyle.container4}>
                            <MaterialCommunityIcons name="email" size={30} color="white" style={profileStyle.iconLeft}/>
                            <Text style={profileStyle.textTitle}>Correo</Text>
                            {editEmail == false ?<Text style={profileStyle.textDescription}>{myuser != ""? myuser.personRef.email:"cargando"}</Text>:
                                <TextInput 
                                    style={profileStyle.textDescription} 
                                    value= {myuser.personRef.email} 
                                    onChangeText={(text)=>setEditEmail(text)}
                                />
                            }
                            
                            <Text style={profileStyle.line2}>------------------------------------------------------------------------------------</Text>

                        </View>
                        <View style={profileStyle.container4}>
                            <FontAwesome5 name="keycdn" size={30} color="white" style={profileStyle.iconLeft}/>
                            <Text style={profileStyle.textTitle}>Contraseña</Text>
                            <Text style={profileStyle.textDescription}>******************</Text>
                            <TouchableOpacity onPress={() => {setModalVisible(true)}} style={profileStyle.btnChangePassword}>
                                <MaterialCommunityIcons name="pencil" size={30} color= {'#03a984'} />
                            </TouchableOpacity>
                            <Text style={profileStyle.line2}>------------------------------------------------------------------------------------</Text>
                        </View>
                        <TouchableOpacity style={profileStyle.btnSaveChanges} 
                            onPress={ () => {canIChange()}}
                            disabled={!editsMade}                      
                            >       
                            <Text style={profileStyle.textSaveChanges}>
                                Guardar Cambios
                            </Text>
                        </TouchableOpacity>
                       
                    </ScrollView>    
            </View>   
        </View>
    )
}
export default GeneralProfile


