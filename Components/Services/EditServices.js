import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image,TouchableOpacity } from 'react-native';
import edit from '../../assets/images/Windows/editService.png';
import { updateDoc, doc } from 'firebase/firestore';
import {db} from '../../Data/firebaseConfig';
import { styles } from '../../Styles/editService';


//IMPORTANTE SE NECESITA PASAR EL ID COMO PARAMETRO DEL NAVIGATION
//ALGO ASI LOL
/*    <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          navigation.navigate('EditService', { serviceId: service.id });
        }}
      >
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
*/



const EditServiceScreen = ({route,navigation}) => {
  const { serviceId } = route.params;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');


  const fetchServiceData = async () => {
    try {
      const serviceRef = doc(db, 'Services', serviceId);
      const serviceSnap = await getDoc(serviceRef);

      if (serviceSnap.exists()) {
        const serviceData = serviceSnap.data();
        setName(serviceData.name);
        setPrice(serviceData.price.toString());
        setDescription(serviceData.description);
      } else {
        console.log('El servicio no existe.');
      }
    } catch (error) {
      console.error('Error al obtener los datos del servicio:', error);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const handleSave = async () => {
    try {
      const serviceRef = doc(db, 'Services', serviceId);

      // Actualiza los datos del servicio en Firestore
      await updateDoc(serviceRef, {
        name,
        price: parseFloat(price),
        description,
        updateDate: Timestamp.now(),
      });

      // Navega de regreso a la pantalla anterior o a donde desees
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
    
  };

  return (

    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textHead}>PRI-ENFERMERAS</Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.title}>Editar Servicio</Text>
        <Image source={require(edit)} style={styles.icon}/>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}

      />
      <TextInput
        style={styles.inputD}
        placeholder="Descripcion"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.textButton}>GUARDAR CAMBIOS</Text>
      </TouchableOpacity>

    </View>

  );

};export default EditServiceScreen;