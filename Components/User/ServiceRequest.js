

import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { stylesServiceRequestUser } from '../../Styles/stylesServiceRequestUser';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import DataUser from "../../Data/DataUser.js";
import {Picker} from '@react-native-picker/picker';
import { getFirestore,doc,addDoc,getDoc,query,collection,where,getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import DataServices from '../../Data/DataServices'; 
import { ScrollView } from "react-native-gesture-handler";
import FieldValidation from '../../Tools/UserRequestServiceValidation.js';
import { useNavigation } from "@react-navigation/native";
import DataServiceRequestUser from '../../Data/DataServiceRequestUser.js';
import { getStorage, getDownloadURL, deleteObject, storage,ref, uploadBytes } from "firebase/storage"; 
import * as ImagePicker from 'expo-image-picker';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import appFirebase from "../../Data/firebaseConfig";
import AtentionRequest from "../../Models/AtentionRequest";

const db = getFirestore(appFirebase);

const dbSt = getStorage(appFirebase);
let requestsRef = ref(dbSt, 'AtentionRequest');
const fullPath = requestsRef.fullPath;


const ServiceRequestUser = () => {


    const n = useNavigation();
    //obtenemos el nombre y el id del servicio para mostrarlo en el combobox
    const [servicesList, setServicesList] = useState([]);

    const [selectedService, setSelectedService] = useState(""); 
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); 
    const [imageName, setImageName] = useState(""); 
    const [refService, setRefService] = useState("");
    const [serviceError, setServiceError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const [location, setLocation ] = useState(null);

    useEffect(() => {
        const dataServices = new DataServices();
    
        dataServices.getServices().then((list) => {
        setServicesList(list);
      });
    }, []);

    useEffect(() => {
        (async () => {
  
          let { status } = await Location.requestForegroundPermissionsAsync();
  
          if (status !== 'granted') {
  
            n.replace("Home");
  
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          console.log(location);
          setLocation(location);
        })();
      }, []);

    //------------------------AQUI CARGAMOS LA FOTO--------------\\

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          const { uri } = result.assets[0];
          const name = uri.split('/').pop(); // Extrae el nombre del archivo de la URL
          setImage(uri);
          setImageName(name);
          
          
          console.log('la url de la imagen ' +  uri);
          console.log('el nombre de la iamgen es ' +  name);

        }
      
      };
     
    //----------------------Aqui hacemos las validacion de los 2 campos--------------------------\\
    const handleValidation = async () => {
        const serviceValidation = FieldValidation.validateServiceSelection(selectedService);
        const descriptionValidation = FieldValidation.validateDescription(description);
    
        const dataServiceRequestUser = new DataServiceRequestUser();

        setServiceError(serviceValidation);
        setDescriptionError(descriptionValidation);
    
        if (!serviceValidation && !descriptionValidation) {
          // Enviar los datos requeridos a la base de datos
          //Alert.alert("Solicitud enviada con éxito");
         const refService = doc(db, "Services", selectedService)

          const requestData = {
            description,
            //imageName: imageName || "", 
            imageName,
            //image,
            //downloadURL,
            //imageUrl: k,
            serviceRef: refService ,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
           
        };
        //const docReferenci = 
        await dataServiceRequestUser.uploadFileToStorage(imageName, image, requestData)
    
          // Enviar los datos a Firebase        
            .then(async() => {
              console.log("Solicitud enviada con éxito");
              await console.log("ID del requerimiento: ",dataServiceRequestUser.addRef);
              
              n.navigate("ServiceWaitInterface", {service: dataServiceRequestUser.addRef}); 
            })
            .catch((error) => {
              console.error('Error al enviar la solicitud', error);
            });
        }
      
    };
   
    
    return(
        <View style={stylesServiceRequestUser.container}> 
            <View style={stylesServiceRequestUser.container2}>
                <Text style={stylesServiceRequestUser.texto}>Solicitud de Servicio</Text>
                <Text style={stylesServiceRequestUser.texto1}></Text>
                <Image
                    source={profile}
                    style = {stylesServiceRequestUser.image}
                />
                <Text style={stylesServiceRequestUser.texto2}>Seleccione el tipo de servicio que requiera</Text>
            </View>
            <View style={stylesServiceRequestUser.container3}>
                <ScrollView>
                    <Picker
                        style={stylesServiceRequestUser.combo}
                        selectedValue={selectedService}
                        onValueChange={(itemValue) => setSelectedService(itemValue)}
                        >
                        <Picker.Item label="Selecciona un servicio" value="" />
                        {servicesList.map((service) => (
                            <Picker.Item key={service.id} label={service.name} value={service.id} />
                        ))}
                    </Picker>
                    {serviceError && <Text style={stylesServiceRequestUser.errorText}>{serviceError}</Text>}
                    <TextInput
                        style={stylesServiceRequestUser.inputDescriptionService}
                        placeholder="Escribe una descripcion de lo que esta pasando aqui"
                        multiline={true}   
                        value={description} // Asigna el valor del estado a value
                        onChangeText={(text) => setDescription(text)} // Actualiza el estado cuando cambia el texto                   
                    />
                     
                     {descriptionError && <Text style={stylesServiceRequestUser.errorText}>{descriptionError}</Text>}

                    {image && <Image source={{ uri: image }} style={stylesServiceRequestUser.imageLoad} />}
                    <TouchableOpacity onPress={pickImage} style={stylesServiceRequestUser.btnLoad}>   
                        <Text style={stylesServiceRequestUser.btnTextLoad}>Cargar Imagen</Text>
                    </TouchableOpacity>           
          
                </ScrollView>

            </View>
            <TouchableOpacity 
               
                onPress={handleValidation} 
                style = {stylesServiceRequestUser.btnSolicitar}>
                <Text style = {stylesServiceRequestUser.btnTexto}>Enviar Solicitud</Text>         
            </TouchableOpacity>     
        </View>
    )


}

export default ServiceRequestUser;


