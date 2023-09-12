import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction} from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import UserController from '../Controllers/UserController.js';
import Nurse from '../Models/Nurse.js';
import Person from '../Models/Person.js';
import User from '../Models/User.js';

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google.js";

const db = getFirestore(appFirebase);

const provider = new GoogleAuthProvider();




class DataUser{
    AuthID;
    async authUsers(user) {
        const auth = getAuth();
    
        try {
          const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
          const users = userCredential.user;
          console.log('Inicio de sesión exitoso:', users.displayName);
          this.AuthID = users.uid;
          await this.sleep(600);
          return true;
        } catch (error) {
          let userC = new UserController();
          console.log(error.message);
          let r = userC.getProblemAuth(error.code);
          await this.sleep(600);
          return r;
        }
      }
    
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      
    
    
      async  getRoleAndUserAuth( role) {
        const usersCollection = collection(db, 'User');
        const q = query(usersCollection, where('userAuthId', '==', this.AuthID), where('role', '==', role)); //0 user, 1 admin, 2 nurse
      
        try {
          const querySnapshot = await getDocs(q);
          let referToPerson=""; var finalUser;
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                  console.log('Document data:', doc.data());
                  //i have to make te getperson
                finalUser = new User (null, this.AuthID, role, 1,doc.data().location.latitude, doc.data().location.longitude, "","" );
                referToPerson = doc.data().personRef;
                console.log("Entré: "+ referToPerson);

            });
            const myPerson = await getDoc(referToPerson); //siuuuu
            let personClass;

            console.log("ok");
            role=="2"? personClass = new Nurse(myPerson.data().names, myPerson.data().lastName, myPerson.data().secondLastName,
            myPerson.data().email, myPerson.data().phone, myPerson.data().ci, myPerson.data().status, myPerson.data().speciality,
            myPerson.data().titulationDate, myPerson.data().graduationInstitution,myPerson.data().curriculum
            ) :  personClass = new Person(myPerson.data().names, myPerson.data().lastName, myPerson.data().secondLastName,
            myPerson.data().email, myPerson.data().phone, myPerson.data().ci, myPerson.data().status);
            finalUser.personRef = personClass;

            return finalUser;

          } else {
            return "Acceso denegado";
          }
        } catch (error) {
          console.error('Error al consultar la base de datos:', error);
        }
      }

      async getAuthIDSGoogle(){

        return Google.useAuthRequest({
          iosClientId:"655441475070-4bdn0hlrdmb50aqt5d6mhajl4cv44srb.apps.googleusercontent.com"
          , androidClientId:"655441475070-c5o06mufa9m6cdgf1v1nkv7qnji01ifj.apps.googleusercontent.com"
        })
      }
     
    getUsers() {
        
    }
    getUsersById(){

    }


    async saveGoogleUserClient(user){
      try{
        await runTransaction(db, async(transaction)=>{
          let collectionn = collection(db,"Client");
          let mnames = user.displayName.split(" ");
          const clientt ={
            names: mnames[0],
            lastName: mnames[1],
            secondLastName: "",
            email: user.email,
            ci:"",
            gender:"",
            phone:user.phoneNumber,
            status:1,
            registrationDate: serverTimestamp(),
            updateDate: serverTimestamp()
          }
          await addDoc(collectionn, clientt).then(docRef=>{
            const userSys ={
              location: {
                latitude: 34.0522,
                longitude: -118.2437
              },
              personRef: docRef,
              role:"0",
              status:1,
              registrationDate: serverTimestamp(),
              updateDate: serverTimestamp(),
              userAuthId: this.AuthID
            };
              console.log("Llegué aquí");
             this.saveUser(userSys);
            return true;
          })
          .catch(error=>{
            console.error(error);
            return false;
          })
    
        })
  
       
      }
      catch(error){
        console.log(error);
        return false;
      }
    

    }


    async saveUser(data){
      let mcollection = collection(db,"User");
      await addDoc(mcollection, data).then(docRef=>{
       
        return true;
      })
      .catch(error=>{
        console.error(error);
        return false;
      })

    }

}
export default DataUser;






























