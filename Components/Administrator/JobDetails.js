import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { stylesDetails } from '../../Styles/JobDetailsStyle.js';
import DataJobRequest from '../../Data/DataJobRequest.js';
import JobRequest from '../General/JobRequest.js';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import logo from '../../assets/images/GeneralImages/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

const JobDetails = () => {
  const [loading, setLoading] = useState(false);
  const[myuser, setuser] = useState("");
  var muser="";
  const [JobRequests, setJobRequest] = useState([]);
const n = useNavigation();

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

  const load = async () => {
    setLoading(true);
    try {
      let d = new DataJobRequest();
      let aux = [];
      aux = await d.getJobRequest();
      setJobRequest(aux);
      console.log(JobRequests);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);  
  };

  useEffect(() => {
    load();
  }, []);

  const contactarHandler = (solicitudId) => {
    console.log(`Contactar a la solicitud con ID: ${solicitudId}`);
  };

  const ampliarHandler = (job) => {
   n.navigate("ExpandedJobList", {jobRequest: job});
  };

  const rechazarHandler = (solicitudId) => {
    console.log(`Rechazar la solicitud con ID: ${solicitudId}`);
  };


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
      <View style={stylesAdmin.container3}>
        <ScrollView style={{width:"100%"}}>
          {loading ? (
          <ActivityIndicator size="large" color="white" />
          ) : (
          JobRequests.length > 0 ? (
            JobRequests.map((item) => (
              <View style={stylesDetails.itemContainer} key={item.id}>
                <View style={[stylesDetails.itemInnerContainer, { backgroundColor: 'white', borderRadius: 10 }]}>
                  <View style={stylesDetails.itemDetails}>
                    <Text style={stylesDetails.itemText}>Nombre: {item.names + " " + item.lastName}</Text>
                    <Text style={stylesDetails.itemText}>Egresado de: {item.graduationInstitution}</Text>
                    <Text style={stylesDetails.itemText}>Especialidad: {item.speciality}</Text>
                    <View style={stylesDetails.buttonsContainer}>
                      <TouchableOpacity style={[stylesDetails.button, { backgroundColor: '#064571', marginLeft: 10, marginRight: 10 }]} onPress={() => ampliarHandler(item)}>
                        <Text style={stylesDetails.buttonText}>Ampliar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={{textAlign:"center", color:"white", fontSize:15}}>No hay solicitudes de trabajo</Text>
          )
        )}
        </ScrollView>
      
      </View>

    </View>
  );
};



export default JobDetails;
