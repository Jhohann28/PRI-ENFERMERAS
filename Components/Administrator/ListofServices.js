import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, Modal, Pressable } from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles';
import DataServices from '../../Data/DataServices.js'
import { useNavigation, useRoute } from '@react-navigation/native';
import { stylesNurse } from '../../Styles/NurseStyles';
import { ActivityIndicator } from 'react-native-paper';

const ServicesList = () => {
  
  const n = useNavigation();
  var ServicesLists = [];

  const myDataServices = new DataServices();

  //-----------------------------ESTADOS------------------------------------\\

  const [services, setServices] = useState([]);

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);


  const [modalVisible, setModalVisible] = useState(false);

  const [id , setId] = useState("");
  
  useEffect(() => {

    gettingServices();
    
  },[reload]);



  //------------------------PARTE DE METODO QUE MUESTRA LA LISTA DE SERVICIOS------------------------------\\
  const gettingServices = async () => {
    try {
      setLoading(true);
      ServicesLists = await myDataServices.getServices();
      setServices(ServicesLists);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
    setLoading(false);

  }
  //----------------FUNCION PARA DESABILITAR UN SERVICIO--------------------------------
   const deleteService = async (serviceId) => {
    try {
      setLoading(true);

      var services = new DataServices();
      services.updateServices(serviceId);
      setReload(!reload);
      setModalVisible(false);
    } catch (error) {
      console.error("Error al eliminar el servicio", error);
    }
    setLoading(false);

  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {    
          setModalVisible(!modalVisible);
        }}>
        <View >
          <View style={stylesAdmin.container7}>
            <Text  style={stylesAdmin.textMessage}>Esta seguro de que desea desactivar este servicio?</Text>
            <Pressable
              style={stylesAdmin.btnCancel}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={stylesAdmin.textCancel}>Cancelar</Text>
            </Pressable>
            <Pressable  
              style={stylesAdmin.btnAccept}
              onPress={() => deleteService(id)}>
              <Text style={stylesAdmin.textAccept}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {loading && <ActivityIndicator size="large" color="white"  />} 

      {services.map((item) => (
        <View style={stylesAdmin.container6}  key={item.id}>
          <Text style={stylesAdmin.textNameServices}>{item.name}</Text>
          <Text style={stylesAdmin.textPriceServices}>{item.price} Bs</Text>
          <Text style={stylesAdmin.textTypeOfService}>{item.description}</Text>

          <TouchableOpacity style={stylesAdmin.btnDelete} onPress={() => {setId(item.id); setModalVisible(true)}}>
            <Text style={stylesAdmin.btnTextOptions}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesAdmin.btnEdit} onPress={()=>{n.navigate("ServiceForm", {service: item})}}>
            <Text style={stylesAdmin.btnTextOptions}>Editar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={stylesNurse.containerHorizontal}>
         <TouchableOpacity style={stylesNurse.btnAccept} onPress={()=>{gettingServices()}}><Text style={{alignSelf:"center", fontSize:15}}>Recargar</Text></TouchableOpacity>

      </View>
      <View style={{margin:5}}></View>
    </View>
  );
};

export default ServicesList;
