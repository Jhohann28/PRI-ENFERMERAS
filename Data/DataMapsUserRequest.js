import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,addDoc,getDoc,query,collection,where,getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import AtentionRequest from '../Models/AtentionRequest.js';
import { getAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { UserMapStyle } from '../Styles/UserMapStyles.js';
import * as Location from 'expo-location';



export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
  