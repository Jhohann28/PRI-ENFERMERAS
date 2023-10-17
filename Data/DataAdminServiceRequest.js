import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot} from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import UserController from '../Controllers/UserController.js';
import Nurse from '../Models/Nurse.js';
import Person from '../Models/Person.js';
import User from '../Models/User.js';

import * as Google from "expo-auth-session/providers/google.js";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AtentionRequest from '../Models/AtentionRequest.js';


const db = getFirestore(appFirebase);

class DataAdminServiceRequest{
   r;
      getAtentions=(data, d)=>{
        try {
          
           this.r = new AtentionRequest(d.id, data.date, data.description, data.imageName, data.imageUrl, data.serviceRef, data.status, data.updateDate, data.userRef);
          
           return this.r;
        } catch (error) {
          
        }
      }

      getAtentionsRequestToShow(data, d, service, person, nurse){

        let date = new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        this.r = new AtentionRequest(d.id, formattedDate, data.description, data.imageName, data.imageUrl,service,  data.status, data.updateDate, person);
        if (data.status >=3){
            this.r.nurse  = nurse;
        }
        if(data.status == 6){
          this.r.atentionRef = data.atentionRef;
        }


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
    getUserNurseAtention= async(rrr)=>{
        let rr= await getDoc(rrr.userNurseRef);
        console.log(rr.data());
        return rr.data();
    }
    getPersonAtention= async(rrdata)=>{
      let p = await getDoc(rrdata.personRef);
      return p.data();
    }


    getDescriptionByStatus=(status)=>{

       if(status==1){return "Activo;yellow"}
        else if (status==2){ return "Cancelado(Sin atención);red"}
        else if (status==3){ return "Atendido (Finalizado);green"}
        else if (status==4){ return "Usuario no encontrado;red"}
        else if (status==5){ return "Aceptado (En atención);orange"}
        else if (status==6){ return "Atendido;green"}

    }

}
export default DataAdminServiceRequest;
