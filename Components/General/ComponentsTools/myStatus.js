import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Constants from "expo-constants";


export default function MyStatusBar() { //el resizemode contain se usa para poder hacer un resize de las imagenes adecuado
  

    return (
      
      <View style={{maxHeight: Constants.statusBarHeight+1,flexGrow:1, backgroundColor: "#AFC7D8" }}>
       
      </View>
    );
}