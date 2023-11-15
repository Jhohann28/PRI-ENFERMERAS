import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, Modal, Pressable } from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles';
import DataServices from '../../Data/DataServices.js'
import DataListOfComplaints from '../../Data/DataListOfComplaints';
import { useNavigation } from '@react-navigation/native';


const ListOfComplaints = () => {
  
  const n = useNavigation();
  var ListOfComplaints = [];

  const myDataComplaints = new DataListOfComplaints();

  //-----------------------------ESTADOS------------------------------------\\
  
  
  const [complaints, setComplaints] = useState([]);

  const [reload, setReload] = useState(false);


  const [id , setId] = useState("");


  useEffect(() => {

    gettingComplaints();
    
  },[]);



  //------------------------PARTE DE METODO QUE MUESTRA LA LISTA DE QUEJAS------------------------------\\
  const gettingComplaints = async () => {
    try {
        ListOfComplaints = await myDataComplaints.getComplaints();
        setComplaints(ListOfComplaints);
    } catch (error) {
      console.error('Error al obtener quejas:', error);
    }
  }

  const gettingDetails = async (ref) => {
    let dt= new DataListOfComplaints(); 
    let atentionRequest= await dt.getAnAtenionByReference(ref); 
    n.navigate("AOpen", {atentionn: atentionRequest});
  }

  return (
    <View>
        {complaints.map((item) => (
        <View style = {stylesAdmin.containerComplaintsDetail}  key={item.id}>
            <Text style = {stylesAdmin.textDetailComplaint}>Cliente:{item.clientName}</Text>                       
            
            <Text style = {stylesAdmin.textDetailComplaint}>fecha:{item.date}</Text>
            <Text style = {stylesAdmin.textDetailComplaint}>Descripcion:{item.description}</Text>
            <TouchableOpacity 
                onPress={() => gettingDetails(item.atentionRef)}
                style = {stylesAdmin.btnDetails}>
                <Text style = {stylesAdmin.textDetails}>Detalles</Text>
            </TouchableOpacity>          
        </View>
        ))}
    </View>
  );
};

export default ListOfComplaints;
