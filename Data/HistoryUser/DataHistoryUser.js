import firebase from 'firebase/app';
import appFirebase  from "./../firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction} from "firebase/firestore";
import Atention from '../../Models/Attention.js';

import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';



import AsyncStorage from '@react-native-async-storage/async-storage';
import MapMaker from '../../Tools/Maper.js';


const db = getFirestore(appFirebase);


class DataHistoryUser{
  
    listOfAtentions = [];
    getAtentionListByUser(){

    }
   
    async getAtentionListFormattedByUser(AuthID){

       

        let personRef = await this.getPersonRefOfAnUser(AuthID);

        this.sleep(100);
        console.log("Aquí : ", personRef," auth: ", AuthID);

        const atentionCollectipn = collection(db, 'Atention');

 

    const q = await query(atentionCollectipn, where('clientRef', '==', personRef), where("status","==",1));

        console.log("PAsé la query");

    try {

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {

        let promises = querySnapshot.docs.map(async(doc) => {

            console.log("ENtré al for");

            let nurse = await this.getNurseAtention(doc.data().nurseRef);

            let service = await this.getServiceAtention(doc.data().serviceRef);

            let myDate = await this.getFormattedData(doc.data().date);

            console.log("pase el metodo get");

            let m = new MapMaker();

            console.log("asigné");

            let adress = await m.getAddressFromCoordinates(doc.data().location.latitude, doc.data().location.longitude);

        var myAtention = new Atention(doc.id, doc.data().aditionalCost,doc.data().clientRef, myDate, doc.data().description,

                      doc.data().imageName,   doc.data().imageUrl, nurse,  

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

        console.log("no hay services")
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

            const promises= querySnapshot.docs.map(async (doc) => {

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
    getNurseAtention= async(rrr)=>{
        let rr= await getDoc(rrr);
        return rr.data();
    }

    getFormattedData = async (date) => {

        let datee = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formattedDate = datee.toLocaleDateString('es-ES', options);
        return formattedDate;
    }
  
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
export default DataHistoryUser;































