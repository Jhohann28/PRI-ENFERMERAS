import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, Modal, Pressable, ScrollView, Linking } from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles';

import { useNavigation, useRoute } from '@react-navigation/native';
import { stylesNurse } from '../../Styles/NurseStyles';
import { ActivityIndicator } from 'react-native-paper';
import DataAdminListOfResignations from '../../Data/DataAdminListOfResignations';
import DataNurse from '../../Data/DataNurse';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ListOfResignations = () => {
  
 
    const [resignations, setResignations] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const navigation = useNavigation();

    const [reload, setReload] = useState(true);

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

    const loadResignations = async () => {
      try {
        const dataServices = new DataAdminListOfResignations();
        const resignationsData = await dataServices.getResignations(); 
        setResignations(resignationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar las renuncias:', error);
        setLoading(false);
      }
    };
    const acceptResignation = async(id, referen)=>{
      try {
        let data = new DataNurse();
          await data.acceptResignation(id, referen);
          Alert.alert("La solicitud a sido aceptada");
          setReload(!reload);
      } catch (error) {
        console.log(error)
      }
    }

    const redirectPhone = async(phone)=>{

      Linking.openURL("tel:"+ phone);
    }
    const DeletResigntaion = async(id)=>{
      let llamada = new DataAdminListOfResignations();
      await llamada.DeletResigntaion2(id);
      Alert.alert("Solicitud rechazada");
      setReload(!reload);
    }
  
    useEffect(() => {
      loadResignations();
    }, [reload]);

  return (
    <View>
        <ScrollView>
            {loading ? (
            <ActivityIndicator size="large" color="#000" />
            ) : (
                resignations.map((resignation, id) => (
                    <View key={id} style={stylesAdmin.container5}>
                    <Text style={stylesAdmin.textName}>{resignation.nurseRef.names + " " + resignation.nurseRef.lastName + (resignation.nurseRef.secondLastName ? " " + resignation.nurseRef.secondLastName : "")}</Text>
                    <Text style={stylesAdmin.textReason}>{resignation.reason}</Text>
                    <Text style={stylesAdmin.textReason}>Fecha: {resignation.date}</Text>
                    <TouchableOpacity onPress={() => redirectPhone(resignation.nurseRef.phone)} style={stylesAdmin.btnContact}>
                        <Text style={stylesAdmin.btnTextReason}>Contactar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>acceptResignation(resignation.id, resignation.ref)} style={stylesAdmin.btnUnsubscribe}>
                        <Text style={stylesAdmin.btnTextReason}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => DeletResigntaion(resignation.id)} style={stylesAdmin.btnDecline}>
                        <Text style={stylesAdmin.btnTextReason}>Rechazar</Text>
                    </TouchableOpacity>
                    </View>
                ))
            )}
           


        </ScrollView>
        
    </View>
    
  );
};

export default ListOfResignations;
