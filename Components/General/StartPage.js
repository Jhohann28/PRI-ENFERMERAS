import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Button, TouchableHighlight } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../styles/StartPageStyles.js';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
export default function StartPage() {


    return (
        <View style={styles.container}>
            <View style={styles.startHeader}>
                <Text style={styles.headerText} >¡BIENVENIDO!</Text>
            </View>
            <ScrollView style={styles.myScroll} >
                <View style={styles.container}>
                    <View style={styles.myContainerImg}>
                        <Image source={require("../../assets/images/GeneralImages/icon.png")} style={styles.myImg}>

                        </Image>
                    </View>
                    <View style={styles.containerHorizontal}>
                        <FontAwesome name='user' size={24} color={"black"} style={styles.myIconsTypeOne} ></FontAwesome>
                        <TouchableOpacity style={styles.btnTypeOne}><Text style={styles.btnTypeOneText}>Usuario</Text></TouchableOpacity>
                    </View>
                    <View style={styles.containerHorizontal}>
                    <FontAwesome5 name='user-tie' size={24} color={"black"} style={styles.myIconsTypeOne} ></FontAwesome5>
                        <TouchableOpacity style={styles.btnTypeTwo}><Text style={styles.btnTypeOneText}>Administrador</Text></TouchableOpacity>
                    </View>
                    <View style={styles.containerHorizontal}>
                        <FontAwesome5 name='user-nurse' size={24} color={"black"} style={styles.myIconsTypeOne} ></FontAwesome5>
                        <TouchableOpacity style={styles.btnTypeThree}><Text style={styles.btnTypeOneText}>Trabaja con nosotros</Text></TouchableOpacity>
                    </View>
                </View>


            </ScrollView>
            <View style={styles.startFooter}>
                <Text style={styles.footerText} >©Univalle  PRI-2023</Text>
            </View>


        </View>

    );
}