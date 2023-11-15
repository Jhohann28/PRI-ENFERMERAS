import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../Styles/StartPageStyles.js';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DataUser from '../../Data/DataUser.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';
import DataServiceRequestUser from '../../Data/DataServiceRequestUser.js';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
export default function Calification() {

  
    const [modalVisible, setModalVisible] = useState(false);

  const n = useNavigation();
  const r = useRoute();

  const {Atention} = r.params;



   const [starCount, setStarCount]= useState(0);
        
       
     const registerValoration=async()=>{
        setModalVisible(true);
        const data ={
            valoration: starCount,
            id:Atention.id
        }
        let dt = new DataServiceRequestUser();
        let result = await dt.registerValoration(data, 1);
        if(result==true){
            Alert.alert("Éxito","Calificación registrada exitósamente, la atención finalizó");
            n.replace("UserHome");
        setModalVisible(false);

        }
        setModalVisible(false);

     }   
     const goToComplaint=async()=>{
        setModalVisible(true);

        const data ={
            valoration: starCount,
            id: Atention.id
        }
        let dt = new DataServiceRequestUser();
        let result = await dt.registerValoration(data, 0);
        if(result ==true){
            n.replace("UserComplaint", {idAtention:Atention.id});
        }
        setModalVisible = false;
     }  
        
        useEffect(()=>{
           // getLocalUser();

        },[])



    return (
        <>
        <View style={styles.container}>
            <View style={styles.startHeader}>
                <Text style={styles.headerText} >Califique la atención</Text>
            </View>
            <ScrollView style={styles.myScroll} >
                
            <Text style={{fontWeight:"bold", fontSize:21, textAlign:"center", color:"#0D47a1", margin:10}}>El precio del servicio fue: {Atention.serviceCurrentCost} Bs. </Text>
            <Text  style={{fontWeight:"bold", fontSize:21, textAlign:"center", color:"#0D47a1", margin:10}}>Hubo un costo adicional de: {Atention.aditionalCost} Bs</Text>
            <Text  style={{fontWeight:"bold", fontSize:21, textAlign:"center", color:"#0D47a1", margin:10}}> Haciendo en total: {Atention.serviceCurrentCost+Atention.aditionalCost} Bs</Text>
            <View style={{margin:20}}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={starCount}
                    fullStarColor='#0D47a1'
                    selectedStar={(rating) => setStarCount(rating)}
                />
                </View>
                <Image source={require("../../assets/images/GeneralImages/client.png")} style={{width:360, height:260, alignSelf:"center"}}></Image>
{modalVisible? 
                        <ActivityIndicator size={53} color="blue" style={{alignSelf:"center"}}></ActivityIndicator>
                    :
                    <View style={{width:"100%", alignItems:"center", margin:5}}>
                    <TouchableOpacity style={styles.btnTypeOne} onPress={()=>{registerValoration();}}>
                            <Text style={styles.btnTypeOneText} >Confirmar</Text>
                       </TouchableOpacity>
            
            
            
                       <View style={{margin:10}}></View>
                       <TouchableOpacity style={styles.btnTypeThree}  onPress={()=>{goToComplaint();}}>
                            <Text  style={styles.btnTypeOneText}>Tengo una QUEJA</Text>
                       </TouchableOpacity>
                    </View> 
                    }
       
          

           <Text style={{fontWeight:"bold", fontSize:21, textAlign:"center", color:"#0D47a1", margin:10}}>No debe abandonar la pantalla actual</Text>

            </ScrollView>
           
          
        </View>
         <View style={styles.startFooter}>
         <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
     </View></>

    );
}