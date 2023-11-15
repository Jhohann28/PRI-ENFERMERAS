/**
 * import { collection, query, where, onSnapshot } from "firebase/firestore";

const q = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  console.log("Current cities in CA: ", cities.join(", "));
});
 */
import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot, updateDoc, deleteDoc} from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import UserController from '../Controllers/UserController.js';
import Nurse from '../Models/Nurse.js';
import Person from '../Models/Person.js';
import User from '../Models/User.js';

import * as Google from "expo-auth-session/providers/google.js";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AtentionRequest from '../Models/AtentionRequest.js';



const db = getFirestore(appFirebase);

class DataNurse{
   r;

   
      getAtentions=(data, d)=>{
        try {
          
           this.r = new AtentionRequest(d.id, data.date, data.description, data.imageName, data.imageUrl, data.serviceRef, data.status, data.updateDate, data.userRef);
          
           return this.r;
        } catch (error) {
          
        }
      }

      getAtentionsToShow(data, d, service, person){

        let date = new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        this.r = new AtentionRequest(d.id, formattedDate, data.description, data.imageName, data.imageUrl,service,  data.status, data.updateDate, person);
         
       // this.r.serviceAuxRef= data.serviceRef;
        //this.r.userAuxRef= data.userRef;

        return this.r;
      }
      getServiceAtention= async(rrr)=>{
          let rr= await getDoc(rrr.serviceRef);
          return rr.data();
      }
      getUserAtention= async(rrr)=>{
        let rr= await getDoc(rrr.userRef);
        console.log(rr.data());
        return rr.data();
    }

    getPersonAtention= async(rrdata)=>{
      let p = await getDoc(rrdata.personRef);
      return p.data();
    }
    
    async acceptResignation(id, userRef){
        const mrequestRef = doc(db, "resignations", id);
        let req = await getDoc(mrequestRef);
  
       
           await deleteDoc(mrequestRef);


              
    const usersCollection = collection(db, 'User');
                const q = query(usersCollection, where('personRef', '==',userRef )); //0 user, 1 admin, 2 nurse
            
                try {
                  const querySnapshot = await getDocs(q);
                  var finalUser="";
                  if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                          console.log('Document data:', doc.data());
                        finalUser = doc.ref;
                        updateDoc(finalUser, {
                          status: -1 ,// -1 disabled
                          role:-1
                        });
                    });}}
                    catch(er){
    
                    }

          

           
    }
  
}
export default DataNurse;