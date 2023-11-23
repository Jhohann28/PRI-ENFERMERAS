import React , { useEffect, useState }from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import logo from '../../assets/images/GeneralImages/logo.png'
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ServicesList from './ListofServices.js';
import { useNavigation, useRoute } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import DataAtentionsAdmin from '../../Data/DataAtentionsAdmin.js';
import { TextInput } from 'react-native-gesture-handler';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import DataServices from '../../Data/DataServices.js';
import ServiceValidation from '../../Controllers/ServiceValidation.js';
const ServiceForm = () => {
    
    const n = useNavigation();
    const r = useRoute();
    const [loading, setLoading] = useState(false);
    const[myuser, setuser] = useState("");

    const[name, setName] = useState("");
    const[description, setDescription] = useState("");

    const[price, setPrice] = useState("");


   const {service} = r.params;
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
    useEffect(()=>{
        if(service !=0){
            setName(service.name);
            setDescription(service.description);
            setPrice(service.price);
            console.log("aquí toy"+ service.price);
        }
    },[])
  
    const saveService=async()=>{
        setLoading(true);
        
            try {
                let data = {
                    name: name,
                    description: description,
                    price: price
                }
                let vld = new ServiceValidation();
                if(vld.isAllOk(data) == true){
                    let dt = new DataServices();
                    await dt.AddService(data);

                    n.navigate("AdminScreen",{loadd:true});
                }
                else{
                    Alert.alert("Error", vld.isAllOk(data))
                }
                setLoading(false);
            } catch (error) {
                Alert.alert("Hola", error.message+"");
                setLoading(false);
            }

    }
    
    const UpdateService= async()=>{
        setLoading(true);
        
            try {
                let data = {
                    id: service.id,
                    name: name,
                    description: description,
                    price: price.toString()
                }
                let vld = new ServiceValidation();
                if(vld.isAllOk(data) == true){
                    let dt = new DataServices();
                    await dt.updateServicesAll(data);

                    n.navigate("AdminScreen",{loadd:true});
                }
                else{
                    Alert.alert("Error", vld.isAllOk(data))
                }
                setLoading(false);
            } catch (error) {
                Alert.alert(error.message);
                setLoading(false);
            }
    }

    return (
        <View style = {stylesAdmin.container}>
              <View style = {stylesAdmin.container2}>
                <Text style={stylesAdmin.texto}>NUEVO SERVICIO</Text>
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
                 <View style={{marginTop:14}}>
                 <Text style={{textAlign:"center", color:"white", fontSize:17, textDecorationLine:"underline", fontWeight:"bold", margin:10}}> 
                 Ingrese su nuevo servicio: 
                 </Text>

                    <Text style={stylesAdmin.myTextInput}> Nombre: </Text>
                    <TextInput  inputMode='text' style={stylesAdmin.myTextInputReal} placeholder='Nombre' 
                        value={name} onChangeText={(text)=>setName(text)}
                    ></TextInput>

                    <Text style={stylesAdmin.myTextInput}>Descripción: </Text>
                    <TextInput inputMode='text'  multiline style={stylesAdmin.myTextInputReal}   placeholder='Descripción'
                      value={description} onChangeText={(text)=>setDescription(text)}
                    ></TextInput>

                    <Text style={stylesAdmin.myTextInput}>Precio Bs: </Text>
                    <TextInput inputMode='decimal'  style={stylesAdmin.myTextInputReal}  placeholder='Precio Bs.'
                      value={price.toString()+""} onChangeText={(text)=>setPrice(text)}
                    ></TextInput>
                    
                   
                {loading== true? <ActivityIndicator size="large" color="white"  />
                    : 
                    <>
                    {service!=0?
                    <View style={stylesNurse.containerHorizontal}>
                    <TouchableOpacity style = {stylesNurse.btnAccept} onPress={async()=> await UpdateService()}><Text style={{fontSize:19, alignSelf:"center", margin:1}}>Editar Datos</Text></TouchableOpacity>
                     </View>
                    :
                    <View style={stylesNurse.containerHorizontal}>
                        <TouchableOpacity style = {stylesNurse.btnAccept} onPress={async()=> await saveService()}><Text style={{fontSize:19, alignSelf:"center", margin:1}}>Guardar Datos</Text></TouchableOpacity>
                    </View>
                    }
                   
                    <TouchableOpacity ><Text style={{fontSize:19, alignSelf:"center", margin:1, color:"white"}} onPress={()=>{n.navigate("AdminScreen")}}>Cancelar</Text></TouchableOpacity>

                    </>   

            } 

                 </View>
                </ScrollView>
            </View>
            
   

            </View>
            )
            }

export default ServiceForm;