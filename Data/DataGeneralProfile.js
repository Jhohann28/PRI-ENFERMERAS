import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, updateDoc} from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updatePassword} from 'firebase/auth';
import UserController from '../Controllers/UserController.js';
import Nurse from '../Models/Nurse.js';
import Person from '../Models/Person.js';
import User from '../Models/User.js';

import * as Google from "expo-auth-session/providers/google.js";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { update } from 'firebase/database';

const db = getFirestore(appFirebase);
const auth = getAuth();

const user = auth.currentUser;


class DataGeneralProfile{
      async  saveChangeUser( AuthID, ddata ) {
        const usersCollection = collection(db, 'User');
        const q = query(usersCollection, where('userAuthId', '==', AuthID)); 
        
        try {
          const querySnapshot = await getDocs(q);
          let referToPerson=""; var finalUser;
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                  console.log('Document data:', doc.data());
                  //i have to make te getperson
                
                referToPerson = doc.data().personRef;
                console.log("Entré: "+ referToPerson);

            });

            const myPerson = await getDoc(referToPerson); 

            await updateDoc(referToPerson, { 
                names: ddata.names,
                lastName: ddata.lastName,
                ci: ddata.ci,
                phone: ddata.phone
            })

            return finalUser;

          } else {
            return "Acceso denegado";
          }
        } catch (error) {
          console.error('Error al consultar la base de datos:', error);
        }
      }
    async saveUser(data){
      let mcollection = collection(db,"User");
      console.log("llegué");
      await addDoc(mcollection, data).then(docRef=>{
       
        return true;
      })
      .catch(error=>{
        console.error(error);
        return false;
      })

    }



    async changePassword (newPassword, user1){
      await updatePassword(user1, newPassword).then(() => {
        console.log("se cambio la contraseña");
        // Update successful.
      }).catch((error) => {
        // An error ocurred
        console.log(error);
        // ...
      });
    }

    async authUsers(email, password, newPassword) {
      const auth = getAuth();
  
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const users = userCredential.user;
        console.log('Cambio de sesión exitoso:', users.displayName);
        await this.changePassword(newPassword, users);
        return true;
      } catch (error) {     
        console.log(error.message);
        return "error, consultando en la bdd"
      }
    }
    

   
 
 

}
export default DataGeneralProfile;































