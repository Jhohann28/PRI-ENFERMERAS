import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { stylesServiceRequestUser } from '../Styles/stylesServiceRequestUser.js';
import * as ImagePicker from 'expo-image-picker';


export default function ImagePickerExample() {
  
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
      console.log('la url de la imagen ' +  uri);
      console.log('el nombre de la iamgen es ' +  name);
    }
  
  };

  return (
    <View style={stylesServiceRequestUser.containerLoadImage}>
        {image && <Image source={{ uri: image }} style={stylesServiceRequestUser.imageLoad} />}
        <TouchableOpacity onPress={pickImage} style={stylesServiceRequestUser.btnLoad}>   
            <Text style={stylesServiceRequestUser.btnTextLoad}>Cargar Imagen</Text>
        </TouchableOpacity>
    </View>
  );
}
