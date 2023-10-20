import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, updateDoc} from "firebase/firestore";
import {getStorage,ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage"

import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth';
import UserController from '../Controllers/UserController.js';
import Nurse from '../Models/Nurse.js';
import Person from '../Models/Person.js';
import User from '../Models/User.js';

import * as Google from "expo-auth-session/providers/google.js";

import AsyncStorage from '@react-native-async-storage/async-storage';
import MySender from '../Tools/MailSender.js';
import GenerateRandoms from '../Tools/GenerateRandoms.js';
import DataUser from './DataUser.js';

const db = getFirestore(appFirebase);

const provider = new GoogleAuthProvider();

const dbSt = getStorage(appFirebase);
let requestsRef = ref(dbSt, 'JobRequests');

const fullPath = requestsRef.fullPath;
const buccket = requestsRef.bucket;

const auth = getAuth();

class DataJobRequest{
    AuthID;
    pasw;
    listJobRequest = [];
    
    uploadFiles = async(fileName, filePath,data)=>{
        

       await fetch(filePath)
            .then((response) => response.blob())
            .then(async(blob) => {
                // Obtén una referencia al archivo en Firebase Storage
                let dt = new Date();
                var myFileName = dt.getMilliseconds().toLocaleString()+"xd"+fileName;
                
                const archivoRef = ref(dbSt, "JobRequests/"+ myFileName);


               await uploadBytes(archivoRef, blob)
                .then((snapshot) => {
                    console.log('Archivo subido con éxito');
                    // Puedes obtener la URL de descarga del archivo
                    return getDownloadURL(snapshot.ref);
                })
                .then(async(downloadURL) => {
                    console.log('URL de descarga del archivo:', downloadURL);
                    const myData={
                      ci:data.ci,
                      email:data.email,
                      graduationInstitution:data.graduationInstitution,
                      lastName:data.lastName,
                      names:data.names,
                      phone:data.phone,
                      secondLastName:data.secondLastName,
                      speciality:data.speciality,
                      titulationDate:data.titulationDate,
                      curriculumName:myFileName,
                      curriculumUrl:downloadURL,
                      status:1,
                      registrationDate:serverTimestamp(),
                      updateDate:serverTimestamp()
                    }
                    let collectionn = collection(db,"JobRequest");
          
                  
        
        await addDoc(collectionn, myData).then(docRef=>{ })
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
               return true
            }
            return false;
        }
        catch(e){
            console.log(e);
            return false;
        }
       
    }


    createNurseFromJobRequest = async(id)=>{
        
        try {
            let h=await runTransaction(db, async()=>{
                const mrequestRef = doc(db, "JobRequest", id);
                      let req = await getDoc(mrequestRef);
                    let n =new GenerateRandoms();
                    let pas = n.generatePassword(8);
                    console.log(pas);
                   const r= await createUserWithEmailAndPassword(auth, req.data().email, pas)
                    .then(async (userCredential) => {
                        
                        const user = userCredential.user.uid;
                        this.AuthID = user;
                        this.pasw= pas;
                        // ...
                        await this.createNurse(req);
                        await updateDoc(mrequestRef,{status:2});
                        return true;


                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        return false;
                    });

                    return r;


            })
            return h;
        } catch (error) {
              return false;
        }
       
    }


    createNurse=async (reqq)=>{
        let collectionn = collection(db,"Nurse");
        const newNurse ={
          names: reqq.data().names,
          lastName: reqq.data().lastName,
          secondLastName: reqq.data().secondLastName,
          email: reqq.data().email,
          ci: reqq.data().ci,
          gender:"",
          phone: reqq.data().phone,
          status:1,
          registrationDate: serverTimestamp(),
          updateDate: serverTimestamp(),
          graduationInstitution: reqq.data().graduationInstitution,
          titulationDate: reqq.data().titulationDate,
          speciality: reqq.data().speciality,
          curriculumName: reqq.data().curriculumName,
          curriculumUrl: reqq.data().curriculumUrl
        }
        await addDoc(collectionn, newNurse).then(docRef=>{ 
          const userSys ={
            location: {
              latitude: 34.0522,
              longitude: -118.2437
            },
            personRef: docRef,
            role:"2", //0 es user
            status:1,
            registrationDate: serverTimestamp(),
            updateDate: serverTimestamp(),
            userAuthId: this.AuthID
          };
            console.log("Llegué aquí");
            let sender = new MySender();
            this.saveUser(userSys);

            sender.sendMail(reqq.data().email, "Usuario creado: ", "Bienvenido, use esta contraseña la primera vez: "+this.pasw);
          return true;
        })
        .catch(error=>{
          console.error(error);
          return false;
        })
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


      async DeleteRequest(id){
        const mrequestRef = doc(db, "JobRequest", id);
        let req = await getDoc(mrequestRef);

        const desertRef = ref(dbSt, 'JobRequests/'+req.data().curriculumName);
           const h= await  deleteObject(desertRef).then(() => {
                  updateDoc(mrequestRef,{status:0});

            console.log("Eliminado");
            return true;
            }).catch((error) => {
              console.log(error);
                return false;
            });
            return h;

      }
    async getJobRequest(){

      const jobRequestCollection = collection(db, 'JobRequest');

      const q = query(jobRequestCollection, where('status', '==', 1)); //0 user, 1 admin, 2 nurse
  
      try {
  
        const querySnapshot = await getDocs(q);
  
  
        if (!querySnapshot.empty) {
  
          querySnapshot.forEach((doc) => {
          let jobrequest = new Nurse(doc.data().names, doc.data().lastName, doc.data().secondLastName, doc.data().email,doc.data().phone,doc.data().ci,doc.data().status,doc.data().speciality,doc.data().titulationDate,doc.data().graduationInstitution,'');
          //aquí añadí a tu lista de services
          let curriculum = {
            curriculumName:doc.data().curriculumName, 
            curriculumUrl:doc.data().curriculumUrl
          }      
          jobrequest.curriculum= curriculum;
          jobrequest.id=doc.id;      
          console.log(doc.id);
          this.listJobRequest.push(jobrequest);
                    
        });
        
          return  this.listJobRequest;
                          
        } 
        else {
          return [];
        }
      } 
      catch (error) {
          console.error('Error al consultar la base de datos:', error);
      }
    }

}
export default DataJobRequest;































