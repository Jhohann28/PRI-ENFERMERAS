
import firebase from 'firebase/app';
import appFirebase  from "./../firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot} from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import Nurse from '../../Models/Nurse.js';
import Person from '../../Models/Person.js';
import User from '../../Models/User.js';

import * as Google from "expo-auth-session/providers/google.js";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Atention from '../../Models/Atention.js';
import MapMaker from '../../Tools/Maper.js';



const db = getFirestore(appFirebase);

class HistoryNurseData{
   
    listOfAtentions=[];
    getAtentionListByNurse(){

    }
    async getAtentionListFormattedByNurse(AuthID){
        
        let personRef = await this.getPersonRefOfAnUser(AuthID);
        console.log("Aquí : ", personRef," auth: ", AuthID);
        const atentionCollectipn = collection(db, 'Atention');
        await this.sleep(170);

    const q =  query(atentionCollectipn, where('nurseRef', '==', personRef), where("status","==",1)); 
        console.log("PAsé la query");
    try {

      const querySnapshot = await getDocs(q);


      if (!querySnapshot.empty) {

        let promises = querySnapshot.docs.map(async(doc) => {
            console.log("ENtré al for");
            let client = await this.getUserAtention(doc.data().clientRef);
            let service = await this.getServiceAtention(doc.data().serviceRef);
            let myDate = await this.getFormattedData(doc.data().date);
            let m = new MapMaker();
            console.log("asigné");

            let adress = await m.getAddressFromCoordinates(doc.data().location.latitude, doc.data().location.longitude);

        var myAtention = new Atention(doc.id, doc.data().aditionalCost,client, myDate, doc.data().description,
                      doc.data().imageName,   doc.data().imageUrl, doc.data().nurseRef,  
                      doc.data().physicalTest,   doc.data().reference , doc.data().serviceCurrentCost ,
                             service, 1,doc.data().treatment, adress
        );
        console.log("pasé el primer");
        
        console.log(myAtention);
        this.listOfAtentions.push(myAtention);
                  
      });
      await Promise.all(promises);    

      console.log("Lo tengo");
        return  this.listOfAtentions;
                        
      } 
      else {
        return "No hay services";
      }
    } 
    catch (error) {
        console.error('Error al consultar la base de datos:', error);
    }

    }



    async getPersonRefOfAnUser(AuthID){
        const usersCollection = collection(db, 'User');
        const q = query(usersCollection, where('userAuthId', '==', AuthID)); 
      
        try {
          const querySnapshot = await getDocs(q);
          let referToPerson="";
          if (!querySnapshot.empty) {
            const promises=  querySnapshot.docs.map(async (doc) => {
                  console.log('Document data:', doc.data());
                referToPerson = await doc.data().personRef;
                console.log("Entré: "+ referToPerson);

            });
            
            await Promise.all(promises); 
            console.log("Hola mundo");
            return referToPerson;

          } else {
            return "ERROR";
          }
        } catch (error) {
          console.error('Error al consultar la base de datos:', error);
        }
    }

       getServiceAtention= async(rrr)=>{
          let rr= await getDoc(rrr);
          return rr.data();
      }
      getUserAtention= async(rrr)=>{
        let rr= await getDoc(rrr);
          return rr.data();
         }
   
    getFormattedData= async (date)=>{
        let datee = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formattedDate = datee.toLocaleDateString('es-ES', options);
        return formattedDate;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

}
export default HistoryNurseData;