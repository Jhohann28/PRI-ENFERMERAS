
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getReactNativePersistence,initializeAuth} from 'firebase/auth'
import  ReactNativeAsyncStorage  from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBzqFMfz2JwI42xZIc2dur98dax_v5UoFc",
  authDomain: "pri-enfermeras-daaae.firebaseapp.com",
  projectId: "pri-enfermeras-daaae",
  storageBucket: "pri-enfermeras-daaae.appspot.com",
  messagingSenderId: "538616007752",
  appId: "1:538616007752:web:cf3dd3d2e66dfb60f39c7d",
  measurementId: "G-2N42SVWYEC"
};


const appFirebase = initializeApp(firebaseConfig);
//const auth = getAuth(appFirebase);
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(appFirebase);


export default {appFirebase,auth,db};



