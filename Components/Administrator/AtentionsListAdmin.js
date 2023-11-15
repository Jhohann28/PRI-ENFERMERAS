import React , { useEffect, useState }from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList, ActivityIndicator} from 'react-native';
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
import DataAtentionsAdmin from '../../Data/DataAtentionsAdmin.js';
import { TextInput } from 'react-native-gesture-handler';
import { Picker, PickerIOS } from '@react-native-picker/picker';
const AtentionsListAdmin = () => {
    
    const n = useNavigation();

    const [loading, setLoading] = useState(false);
    const[myuser, setuser] = useState("");
    const [atentions, setAtentions]= useState([]); 
const [selectedValue, setSelectedValue] = useState("1");
    const [inputFilter, setInputFilter] = useState("");
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

    const getAtentions = async ()=>{
        setLoading(true);
        let d = new DataAtentionsAdmin();
       let at= await d.getAtentionList("1");
       setAtentions(at);
       setLoading(false);
    }



    useEffect(()=>{
        getLocalUser();
    },[])
    useEffect(()=>{
getAtentions();
       
    },[])
    const OpenALot = (atention)=>{
            n.navigate("AtentionAdminOpen", {atentionn: atention})
    }
    const orderBySomething=async(n)=>{
        setLoading(true);
        let listOfAtentions=[...atentions];
  if(n ==2){ //ordenar por precio
    listOfAtentions.sort((a,b)=>(b.aditionalCost+b.serviceCurrentCost)-(a.aditionalCost+a.serviceCurrentCost));
    console.log(listOfAtentions[0].serviceRef.name)
    setAtentions(listOfAtentions);
  }
  else if (n==4) //nombre servicios
  {
    listOfAtentions.sort((a, b) => {
        
        
        if (a.serviceRef.name < b.serviceRef.name) {
          return -1;
        }
        if (a.serviceRef.name > b.serviceRef.name) {
          return 1;
        }
        return 0;
      })
      setAtentions(listOfAtentions);
  }
  else if (n==5) //nombre clientes
  {
    listOfAtentions.sort((a, b) => {
        
        
        if (a.clientRef.names < a.clientRef.names) {
          return -1;
        }
        if (a.clientRef.names > a.clientRef.names) {
          return 1;
        }
        return 0;
      })
      setAtentions(listOfAtentions);
  }
  else if( n==6){
    listOfAtentions.sort((a, b) => {
        
        
        if (a.nurseRef.names < a.nurseRef.names) {
          return -1;
        }
        if (a.nurseRef.names > a.nurseRef.names) {
          return 1;
        }
        return 0;
      })
      setAtentions(listOfAtentions);
  }
  else{
        let d = new DataAtentionsAdmin();
       let at= await d.getAtentionList(n);
       setAtentions(at);}
       setLoading(false);
    }

    return (
        <View style = {stylesAdmin.container}>
              <View style = {stylesAdmin.container2}>
                <Text style={stylesAdmin.texto}>Lista de Atenciones</Text>
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
                <View style={stylesNurse.containerHorizontal}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue); orderBySomething(itemValue)}}
                    style={{width:"10%"}}
                >
                    <Picker.Item label="Ordene según su preferencia" value="1" />
                    <Picker.Item label="Ordenar por precio de atención" value="2" />
                    <Picker.Item label="Ordenar por fecha" value="3" />
                    <Picker.Item label="Ordenar por Servicio" value="4" />
                    <Picker.Item label="Ordenar por Cliente" value="5" />
                    <Picker.Item label="Ordenar por Enfermera" value="6" />

                 </Picker>
                 <TextInput style={stylesAdmin.mySearcher} placeholder='Buscar'
                 onChangeText={(text)=>{setInputFilter(text)} } value={inputFilter}
                 ></TextInput>
                 
                </View>
               
            </View>
            </View>
            <View style = {stylesAdmin.container3}>
                <ScrollView style={stylesNurse.myScroll}>
                {loading && <ActivityIndicator size="large" color="white"  />} 
                    {atentions.length>0?
                    atentions.map((item)=>{
                        if(inputFilter != ""){
                            if(!item.clientRef.names.includes(inputFilter) && !item.clientRef.lastName.includes(inputFilter)
                           &&  !item.date.includes(inputFilter) && !item.serviceRef.name.includes(inputFilter)
                           &&   item.aditionalCost!=inputFilter && item.serviceCurrentCost!= inputFilter
                           &&   item.aditionalCost+item.serviceCurrentCost!= inputFilter
                           &&  !item.adress.includes(inputFilter) && !item.nurseRef.names.includes(inputFilter) && !item.nurseRef.lastName.includes(inputFilter)
                           
                            ){
                                return;
                            }
                           } 
                        
                        
                        return(
                        <View style={stylesNurse.myAtentionRequestItem} >
                    <View style={stylesNurse.containerHorizontal}
                    >
                        <FontAwesome5 name="hospital-user" size={40} color="black"  />
                      <View></View>
                        <View  style={stylesNurse.containerHorizontal2}
                        >
                            
                              <Text style={stylesNurse.left} >Cliente:<Text style={{fontWeight:"normal"}} > {item.clientRef.names.split(" ")[0]+" "+item.clientRef.lastName}</Text> </Text>
                              <Text  style={stylesNurse.left}>Servicio: <Text style={{fontWeight:"normal"}} > {item.serviceRef.name}</Text></Text>
    
                                      
                                
                                <Text  style={stylesNurse.left}>Total: <Text style={{fontWeight:"normal"}} ></Text>{item.serviceCurrentCost+item.aditionalCost} Bs.</Text>
                                <View style={  stylesNurse.containerHorizontal3}
                                    >
                                        <Text style={stylesNurse.left} >Precio Servicio:<Text style={{fontWeight:"normal"}} >{item.serviceCurrentCost}</Text> | </Text>
                                        <Text  style={stylesNurse.left}>Adicional:<Text style={{fontWeight:"normal"}} >{item.aditionalCost}</Text> </Text>
    
                                      
                                </View>
    
                                <View style={stylesNurse.containerHorizontal3}
                                    >
                                        <Text  style={stylesNurse.left}>Dirección: <Text style={{fontWeight:"normal"}} >{item.adress}</Text></Text>
    
                                </View>
                                <Text  style={stylesNurse.left}>Enfermera: <Text style={{fontWeight:"normal"}} > {item.nurseRef.names.split(" ")[0]+" "+item.nurseRef.lastName}</Text> </Text>
                                <Text  style={stylesNurse.left}>Calificación: <Text style={{fontWeight:"normal"}} >{item.valoration}/5</Text> </Text>
    
                        </View>
                    </View>
                    <View style={{alignSelf:"center"}}><Text style={{textAlign:"center"}} >Fecha:  {item.date}</Text></View>
                    <View style={stylesNurse.containerHorizontalButtons}>
                            <TouchableOpacity style={stylesNurse.btnAccept2} onPress={()=>OpenALot(item)}>
                                <Text style={{textAlign:"center", fontWeight:"bold", fontSize:15}}>Ampliar</Text>
                            </TouchableOpacity>
                           
    
                    </View>
                    </View>
                    )})
                    
                
                
                :<Text style={{textAlign:"center", color:"white", fontSize:20}}>No hay atenciones brindadas</Text>}
               
                
                    
                </ScrollView>
            </View>
            
   

            </View>
            )
            }

export default AtentionsListAdmin;