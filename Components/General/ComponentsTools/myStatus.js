import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Constants from "expo-constants";


export default function MyStatusBar() { //el resizemode contain se usa para poder hacer un resize de las imagenes adecuado
  
                
  const [win, setWin] = useState(0);
  const [title, setTitle] = useState('Cargando...');
  const [enf, setEnf] = useState('');
  const [autor, setFuente] = useState('');
  const [entradas, setEntradas] = useState('');

    return (
      
      <View style={{maxHeight: Constants.statusBarHeight+1,flexGrow:1, backgroundColor: "#AFC7D8" }}>
       
      </View>
    );
}
