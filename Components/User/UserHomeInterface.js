import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { styles } from '../../Styles/UserStyles.js'; // Debería ser 'style', no 'Styles'
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import world from '../../assets/images/GeneralImages/World.gif';
import {Ionicons} from '@expo/vector-icons';

const Home = () => {
    return(
        <View style={styles.container}> 
            <View style={styles.container2}>
                <Text style={styles.texto}>Hello</Text>
                <Text style={styles.texto1}>Linda Valencia</Text>
                <Image
                    source={profile}
                    style = {styles.image}
                />
                <Text style={styles.texto2}>somo vida, somo parte de ti en todas partes estamos</Text>
            </View>

            <Image

                source={world}
                style={styles.worldBlue}
            />
            <TouchableOpacity 
                onPress={() => Alert.alert('Holaaaaaa')} 
                style = {styles.btnSolicitar}>
                <Text style = {styles.btnTexto}>Solicitar</Text>         
            </TouchableOpacity>     
        </View>
    )
}
export default Home


