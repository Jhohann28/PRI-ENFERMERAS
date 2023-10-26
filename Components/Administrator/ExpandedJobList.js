import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Linking, Alert , Modal, ActivityIndicator} from 'react-native';
import { stylesExpanded } from '../../Styles/ExpandedJobListStyles.js';
import DataJobRequest from '../../Data/DataJobRequest.js';
import JobRequest from '../General/JobRequest.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import ListNurseData from '../../Data/LisNurseData.js';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/images/GeneralImages/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { stylesNurse } from '../../Styles/NurseStyles.js';

const ExpandedJobList = () => { //no es list
  const [load, setLoad] = useState(false);
  
  const [date, setDate] = useState("");
  const n = useNavigation();
  const r = useRoute();
  const [myuser, setuser] = useState("");
  const [typeAction, setTypeAction] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

  var muser = "";


  const getLocalUser = async () => {

    try {
      muser = await AsyncStorage.getItem("user");
      let muserJson = muser ? JSON.parse(muser) : null;
      setuser(muserJson);
    }
    catch (e) {
      console.error(e);
      setuser("");
    }
  }

  useEffect(() => {
    getLocalUser();
  }, [])

  const { jobRequest } = r.params;
 


  const contactarHandler = (solicitudId) => {
    console.log(`Contactar a la solicitud con ID: ${solicitudId}`);
  };

  const ampliarHandler = (solicitudId) => {
    console.log(`Ampliar la solicitud con ID: ${solicitudId}`);
  };

  const rechazarHandler = (solicitudId) => {
    console.log(`Rechazar la solicitud con ID: ${solicitudId}`);
  };
  var datee = ""
  const da = async () => {

    let d = new ListNurseData();
    datee = await d.getFormattedData(jobRequest.titulationDate);
    console.log(datee);
    setDate(datee);
  }

  useEffect(() => {
    da();

  }, []);
  const handleLinkPress = (url) => {
   
    Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));
  
  };




  const makeAction = async()=>{
    setLoading(true);
    let t = typeAction;
    switch (t){
        case 2:
            let d = new DataJobRequest();
             let r= await d.contactNurse(jobRequest.id);
             await Linking.openURL("tel:"+jobRequest.phone);
             if(r==true){
             
              n.reset({
                index: 0,
                routes: [{ name: 'JobDetails' }],
              });
            }
            else{
              Alert.alert("Error", "Contáctese con los desarrolladores");
              setModalVisible(false);
            }
            setLoading(false);



        break;
        case 1:
            let d2 = new DataJobRequest();
            let r3= await d2.createNurseFromJobRequest(jobRequest.id); //era esto xd
            if(r3==true){
                console.log("registrado ok");
                Alert.alert("Éxito", "Se registró a la enfermera");
                n.reset({
                  index: 0,
                  routes: [{ name: 'JobDetails' }],
                });
            }
            else{
              Alert.alert("Error", "Contáctese con los desarrolladores");
              setModalVisible(false);
            }
            setLoading(false);

        break;
        case 3:
            let d3 = new DataJobRequest();
            let r2= await d3.DeleteRequest(jobRequest.id); 
            if(r2){
              Alert.alert("Éxito", "Se rechazó la solicitud de trabajo");
              n.reset({
                index: 0,
                routes: [{ name: 'JobDetails' }],
              });
            }
            else{
              Alert.alert("Error", "Contáctese con los desarrolladores");
              setModalVisible(false);
            }
            setLoading(false);
           
            break;
    }
    
}
  return (
    <View style={stylesAdmin.container}>
      <View style={stylesAdmin.container2}>
        <Text style={stylesAdmin.texto}>Lista de Enfermeras</Text>
        <Text style={stylesAdmin.texto1}>{myuser != "" ? myuser.personRef.names : ""}</Text>
        <Ionicons name="ios-person-circle-outline" size={74} color="white" style={stylesAdmin.image} />
        <View style={stylesAdmin.container4}>
          <Text style={stylesAdmin.textCorporationTitle}>SISEEM</Text>
          <Text style={stylesAdmin.textCorporation}>Servicios de vida al 100%</Text>
          <Image
            source={logo}
            style={stylesAdmin.image}
          />
        </View>
      </View>
      
      <Modal
            style={{justifyContent:"center", alignItems:"center", alignSelf:"center"}}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                    <View style={stylesAdmin.MyModal} >
                    <View>
                    <Text style={{fontSize:20, textAlign:"center", }}>¿Estás seguro de realizar la acción?</Text>
                    {loading ? <ActivityIndicator size="large" color="#064571" />
                    
                : <View style={stylesNurse.containerHorizontal}>
                            
                <TouchableOpacity
                
                onPress={() => setModalVisible(!modalVisible)}  style={stylesAdmin.myBtnModalCancel}>
                <Text style={{textAlign:"center", fontSize:22}} >Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={stylesAdmin.myBtnModalAccept}
                
                onPress={async() => { await makeAction();}}>
                <Text style={{textAlign:"center", fontSize:22, color:"white"}} >Confirmar</Text>
                </TouchableOpacity>
                </View>
               
                    }  
            </View>
                       
                    </View>
                </Modal>

      <View style={stylesAdmin.container3}>
        <View style={[stylesExpanded.itemInnerContainer, { backgroundColor: 'white', borderRadius: 10, margin:5 }]}>
          <ScrollView>
            <View style={stylesExpanded.itemDetails}>

              <Text style={stylesExpanded.itemText}>Nombre Completo: {jobRequest.names + " " + jobRequest.lastName + " " + jobRequest.secondLastname}</Text>

              <Text style={stylesExpanded.itemText}>Egresado de: {jobRequest.graduationInstitution}</Text>
              <Text style={stylesExpanded.itemText}>Fecha de egreso: {date}</Text>
              <Text style={stylesExpanded.itemText}>Especialidad: {jobRequest.speciality}</Text>
              <Text style={stylesExpanded.itemText}>Ci: {jobRequest.ci}</Text>
              <Text style={stylesExpanded.itemText}>Email: {jobRequest.email}</Text>
              <Text style={stylesExpanded.itemText}>Teléfono: {jobRequest.phone}</Text>
              <TouchableOpacity style={stylesExpanded.itemText} onPress={()=>{handleLinkPress(jobRequest.curriculum.curriculumUrl)}} ><Text style={{alignSelf:"center"}}> Ver currículum</Text></TouchableOpacity>
              
            </View>
          </ScrollView>
         
        </View>
        <View style={stylesExpanded.buttonsContainer}>
          <TouchableOpacity style={[stylesExpanded.button, { backgroundColor: '#009B35' }]} onPress={() =>{setTypeAction(1); setModalVisible(true);}}>
            <Text style={stylesExpanded.buttonText}>Dar de Alta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[stylesExpanded.button, { backgroundColor: '#56D782', marginLeft: 10, marginRight: 10 }]} onPress={() =>{setTypeAction(2);setModalVisible(true);}}>
            <Text style={stylesExpanded.buttonText}>Contactar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[stylesExpanded.button, { backgroundColor: 'red' }]} onPress={() =>{setTypeAction(3);setModalVisible(true);}}>
            <Text style={stylesExpanded.buttonText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
};



export default ExpandedJobList;
