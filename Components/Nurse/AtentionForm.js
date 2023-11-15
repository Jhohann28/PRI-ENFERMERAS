import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { stylesN } from '../../Styles/ReportStyle.js';
import * as ImagePicker from 'expo-image-picker';
import NurseAtentionData from '../../Data/NurseAtentionData.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import NurseAtentionDataForm from '../../Data/NurseAtentionDataForm.js';

const AtentionForm = () => {



  const n = useNavigation();
  const r = useRoute();

  const {atention} = r.params;

  const [aditionalCost, setAditionalCost] = useState('');
  const [description, setDescription] = useState('');
  const [treatment, setTreatment] = useState('');
  const [physicalTest, setPhysicalTest] = useState('');
  const [reference, setReference] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [imageName, setImageName] = useState(null);

const [loading, setLoading]=useState(false);


  const handleImagenChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //VALIDAAAAAAAAR 
    //QUE LA CADENA NO ESTE LLENA DE ESPACIOS

    if (!result.canceled) {
      console.log(result);
      console.log(result.assets[0].uri);
      let uri = result.assets[0].uri;
      let name = uri.split('/').pop()
      setImageUrl(result.uri);
      setImageName(name);
    }
  };

  const sendAtention =async () => {
    setLoading(true);
    const generalRegex = /^(?=.*[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]).+$/;
    const numberRegex = /^[0-9.]*$/;
    if(generalRegex.test(description.trim()) && generalRegex.test(treatment.trim())&& generalRegex.test(physicalTest.trim())&& generalRegex.test(reference.trim()) && numberRegex.test(aditionalCost.trim()) ){
      let data ={
        aditionalCost: aditionalCost.trim(),
        description: description.trim(),
        treatment: treatment.trim(),
        physicalTest: physicalTest.trim(),
        reference:reference.trim(),
       id:atention.id
      }

      let myData = new NurseAtentionDataForm();
      if(imageUrl != null){
        let result = await myData.registerAtentionByFiles(imageName, imageUrl, data);
        if(result==true){
          Alert.alert("Éxito", "Se registró la atención, aguarde por su calificación");
          n.navigate("WaitingConfirmationByUser", {atention:atention});
          setLoading(false);

        }
        else{
          Alert.alert("Error", "Contáctese con el desarrollador");
          setLoading(false);

        }
      }
      else{
        let result = await myData.registerWithOutFiles("", "", data);
        if(result==true){
          Alert.alert("Éxito", "Se registró la atención, aguarde por su calificación");
          n.navigate("WaitingConfirmationByUser", {atention:atention});
          setLoading(false);

        }else{
          Alert.alert("Error", "Contáctese con el desarrollador");
          setLoading(false);

        }
      }
    }
    else
    {
        Alert.alert("Error", "Uno o más campos fueron ingresados de forma incorrecta");   
        setLoading(false);

    }
       
    
  };

  return (
    <View style={stylesN.container}>
      <ScrollView style={{ width: "100%" }} >

        <View style={stylesN.startHeader}>
          <Text style={stylesN.headerText} >Reporte</Text>
        </View>
        <View style={stylesN.form}>
          <View style={stylesN.section}>
            <Text style={stylesN.label}>Costo Adicional</Text>
            <TextInput
              style={stylesN.input}
              placeholder="Costo Adicional"
              value={aditionalCost}
              onChangeText={(text) => setAditionalCost(text)}
            
              returnKeyType="done"
              locale="en-US"
            />

          </View>

          <View style={stylesN.section}>

            <Text style={stylesN.label}>Descripción</Text>
            <TextInput
              style={stylesN.textarea}
              placeholder="Descripción"
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
            />
            <Text style={stylesN.label}>Tratamiento</Text>
            <TextInput
              style={stylesN.textarea}
              placeholder="Tratamiento"
              value={treatment}
              onChangeText={(text) => setTreatment(text)}
              multiline
            />
          </View>
          <View style={stylesN.section}>
            <Text style={stylesN.label}>Examen Fisico</Text>
            <TextInput
              style={stylesN.textarea}
              placeholder="Exámen Fisico"
              value={physicalTest}
              onChangeText={(text) => setPhysicalTest(text)}
              multiline
              returnKeyType="done"

            />
            <Text style={stylesN.label}>Referencia</Text>
            <TextInput
              style={stylesN.input}
              placeholder="Especialista, hospital, etc"
              value={reference}
              onChangeText={(text) => setReference(text)}
              multiline
              returnKeyType="done"

            />
          </View>

          <View style={stylesN.section}>

            {imageUrl && <Image source={{ uri: imageUrl }} style={stylesN.image} />}
            <TouchableOpacity style={stylesN.button2} onPress={handleImagenChange}>
              <Text style={stylesN.buttonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
          </View>



                        
              {loading?<ActivityIndicator size={67} color="#0D47a1" style={{margin:20, alignSelf:"center"}} ></ActivityIndicator>
              :
              <TouchableOpacity style={stylesN.button} onPress={sendAtention}>
              <Text style={stylesN.buttonText}>Enviar</Text>
              </TouchableOpacity>
              }
         
        </View>



     
      </ScrollView>
    </View>

  );
};



export default AtentionForm;
