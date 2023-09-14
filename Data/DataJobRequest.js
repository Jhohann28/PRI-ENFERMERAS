import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction} from "firebase/firestore";
import {getStorage,ref, uploadBytes, getDownloadURL} from "firebase/storage"

import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import UserController from '../Controllers/UserController.js';
import Nurse from '../Models/Nurse.js';
import Person from '../Models/Person.js';
import User from '../Models/User.js';

import * as Google from "expo-auth-session/providers/google.js";

import AsyncStorage from '@react-native-async-storage/async-storage';
import MySender from '../Tools/MailSender.js';


const db = getFirestore(appFirebase);

const provider = new GoogleAuthProvider();

const dbSt = getStorage(appFirebase);
let requestsRef = ref(dbSt, 'JobRequests');

const fullPath = requestsRef.fullPath;
const buccket = requestsRef.bucket;

class DataJobRequest{
    AuthID;
    
    
    uploadFiles = async(fileName, filePath)=>{
        

        fetch(filePath)
            .then((response) => response.blob())
            .then((blob) => {
                // Obtén una referencia al archivo en Firebase Storage
                let dt = new Date();
                const archivoRef = ref(dbSt, "JobRequests/"+ dt.getMilliseconds().toString()+fileName);


                uploadBytes(archivoRef, blob)
                .then((snapshot) => {
                    console.log('Archivo subido con éxito');
                    // Puedes obtener la URL de descarga del archivo
                    return getDownloadURL(snapshot.ref);
                })
                .then((downloadURL) => {
                    console.log('URL de descarga del archivo:', downloadURL);
                })
                .catch((error) => {
                    console.error('Error al subir el archivo:', error);
                });
            })
            .catch((error) => {
                console.error('Error al convertir la URI en blob:', error);
            });
        
    }

    contactNurse = async (id)=>{
        try {
            console.log (id);
            const mrequestRef = doc(db, "JobRequest", id);
            let req = await getDoc(mrequestRef);
    
            if(req!= null){
                let s = new MySender();
               let r= await  s.sendMail(req.data().email, "Estamos interesados en sus servicios", 
               "Por favor, comuniquese al 78700880 o al correo hshhs@hsh.com, estamos interesados en una entrevista con usted"
               )
               return req;
            }
        }
        catch(e){
            console.log(e);
        }
       
    }



}
export default DataJobRequest;































