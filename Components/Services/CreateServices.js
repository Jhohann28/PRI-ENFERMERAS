import React, { useState } from 'react';
import { View, Text, TextInput,Image,TouchableOpacity } from 'react-native';
import { CreateStyles } from '../../Styles/createService';
import create from '../../assets/images/Windows/createService.png';
import { collection, addDoc, Timestamp ,getFirestore} from 'firebase/firestore';
import { appFirebase } from '../../Data/firebaseConfig';


 

const InsertServiceScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

const handleSave = async () => {
  try {
    const db = getFirestore(appFirebase);

    // Crear un objeto con los datos del servicio
    const newService = {
      name,
      price: parseFloat(price), // Convierte el precio a número (asumiendo que price es un número).
      description,
      registrationDate: Timestamp.now(),
      status: 1,
    };

    // Agregar el servicio a la colección "Services"
    const docRef = await addDoc(collection(db, 'Services'), newService);
    Alert.alert('Éxito', 'El servicio se ha creado correctamente.');

    // Limpia los campos después de guardar
    setName('');
    setPrice('');
    setDescription('');
  } catch (error) {
    Alert.alert('Error', 'Hubo un error al crear el servicio. Por favor, inténtalo de nuevo.');
    console.error('Error al crear el servicio:', error);
  }
};

  
  return (

    <View style={CreateStyles.container}>
      <View style={CreateStyles.head}>
        <Text style={CreateStyles.textHead}>PRI-ENFERMERAS</Text>
      </View>
      <View style={CreateStyles.container2}>
        <Text style={CreateStyles.title}>Crear Nuevo Servicio</Text>
        <Image source={require(create)} style={CreateStyles.icon}/>
      </View>

      

      <TextInput
        style={CreateStyles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={CreateStyles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={CreateStyles.inputD}
        placeholder="Descripcion"
        value={description}
        multiline={true}
        onChangeText={(description)=>setDescription(description)}
      />
      <TouchableOpacity style={CreateStyles.button} onPress={handleSave}>
              <Text style={CreateStyles.textButton}>CREAR SERVICIO</Text>
      </TouchableOpacity>
    </View>
  );
  
};export default InsertServiceScreen;