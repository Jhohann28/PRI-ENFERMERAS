import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../../styles/GeneralStyles.js';

export default function Loggin() { //el resizemode contain se usa para poder hacer un resize de las imagenes adecuado
  
                
  const [win, setWin] = useState(0);
  const [title, setTitle] = useState('Cargando...');
  const [enf, setEnf] = useState('');
  const [autor, setFuente] = useState('');
  const [entradas, setEntradas] = useState('');

    return (
      
      <View style={styles.header}>
       <Text>Hoalllala</Text>
      </View>
    );
}
