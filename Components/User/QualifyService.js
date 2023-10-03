import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity,Image ,Alert} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import startFille from '../../assets/images/Windows/star_filled.png';
import startCorner from '../../assets/images/Windows/star_corner.png';
import { db } from '../../Data/firebaseConfig';  
import { addDoc, collection } from 'firebase/firestore';
import { Qualifystyles } from '../../Styles/QualifyServiceStyles';



const App = () => {
  const [defaultRating, setdefaultRating] = useState(0)
  const [maxRating, setMaxRating]= useState([1,2,3,4,5])

  const startImageFilled = startFille
  const startImageCorner = startCorner

  const CustomRatingBar = () =>{
    return(
      <View style={Qualifystyles.CustomRatingBarStyle}>
          {
            maxRating.map((item,key) =>{
              return(
                <TouchableOpacity 
                  activeOpacity={0.7}  key={item}
                  onPress={() => setdefaultRating(item)}
                  >
                 <Image style={Qualifystyles.startIMgStyle}
                  source={
                    item <= defaultRating
                     ? startImageFilled
                     : startImageCorner
                  }>
                 </Image>
                </TouchableOpacity>
              )
            })
          }
      </View>
    )
  };

  const handleSend = async () => {
    try {
      const commentDate = new Date(); 
      const personRef = 'ID_DEL_CLIENTE'; //FALTO LA REFERENCIA AL CLIENTE

      await addDoc(collection(db, 'CommentsClient'), {
        commentDate,
        personRef, //FALTO LA REFERENCIA AL CLIENTE
        startNumber: defaultRating,
      });

      setDefaultRating(0);

      Alert.alert('Comentario enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  return (
      <LinearGradient colors={['#A08DAB','#003CCE','#247AF5','#88B5EE','#D8E8FF']} style={Qualifystyles.gradi}>
         <Text style={Qualifystyles.textStyle}>Por favor Califica Nuestros Servicios</Text> 
         <CustomRatingBar/>
         <Text style={Qualifystyles.textStyle}>
          {defaultRating + ' / ' + maxRating.length}
         </Text>
         <TouchableOpacity
          activeOpacity={0.7}
          style={Qualifystyles.buttonStyle}
          onPress={handleSend}>
          <Text style={Qualifystyles.buttonText}>Enviar Valoracion</Text>
         </TouchableOpacity>
         <TouchableOpacity style={Qualifystyles.buttonStyleR}>
          <Text style={Qualifystyles.buttonText}>Presentar Reclamo</Text>
         </TouchableOpacity>
      </LinearGradient>
  );
};export default App;