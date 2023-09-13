import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, Modal, Pressable } from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles';
import DataServices from '../../Data/DataServices.js'

const ServicesList = () => {
  
  
  var ServicesLists = [];

  const myDataServices = new DataServices();

  //-----------------------------ESTADOS------------------------------------\\

  const [services, setServices] = useState([]);

  const [reload, setReload] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [id , setId] = useState("");


  useEffect(() => {

    gettingServices();
    
  },[reload]);



  //------------------------PARTE DE METODO QUE MUESTRA LA LISTA DE SERVICIOS------------------------------\\
  const gettingServices = async () => {
    try {
      ServicesLists = await myDataServices.getServices();
      setServices(ServicesLists);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  }
  //----------------FUNCION PARA DESABILITAR UN SERVICIO--------------------------------
   const deleteService = async (serviceId) => {
    try {
      var services = new DataServices();
      services.updateServices(serviceId);
      setReload(true);
      setModalVisible(false);
    } catch (error) {
      console.error("Error al eliminar el servicio", error);
    }
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
      {services.map((item) => (
        <View style={stylesAdmin.container6}  key={item.id}>
          <Text style={stylesAdmin.textNameServices}>{item.name}</Text>
          <Text style={stylesAdmin.textPriceServices}>{item.price} Bs</Text>
          <Text style={stylesAdmin.textTypeOfService}>{item.description}</Text>

          <TouchableOpacity style={stylesAdmin.btnDelete} onPress={() => {setId(item.id); setModalVisible(true)}}>
            <Text style={stylesAdmin.btnTextOptions}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesAdmin.btnEdit}>
            <Text style={stylesAdmin.btnTextOptions}>Editar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ServicesList;
