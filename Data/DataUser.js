import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction} from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth';
import UserController from '../Controllers/UserController.js';
import Nurse from '../Models/Nurse.js';
import Person from '../Models/Person.js';
import User from '../Models/User.js';

import * as Google from "expo-auth-session/providers/google.js";

import AsyncStorage from '@react-native-async-storage/async-storage';
import GenerateRandoms from '../Tools/GenerateRandoms.js';
import MySender from '../Tools/MailSender.js';



const db = getFirestore(appFirebase);

const provider = new GoogleAuthProvider();

const auth = getAuth();

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


    async saveUser(data, email, psw){
      let mcollection = collection(db,"User");
      console.log("llegué");
      await addDoc(mcollection, data).then(async docRef=>{
        try {
          let sender = new MySender();
          await sender.sendMail(email, "Usuario creado: ", "Bienvenido, use esta contraseña la primera vez: "+psw);
  
          return true;
        } catch (error) {
        console.error(error);
          
        }
       
      })
      .catch(error=>{
        console.error(error);
        return false;
      })

    }

    async getUserLogued(){
      await AsyncStorage.getItem('user')
      .then((userString) => {
        if (userString) {
          let muser = JSON.parse(userString);
          console.log('Usuario recuperado de AsyncStorage:', muser);
          return muser;
        } else {
          console.log("vacío");
          return "";
        }
      })
      .catch((error) => {
        console.error('Error al recuperar el usuario de AsyncStorage:', error);
        return "";
      });
    }
   async setUserLogued(user){
     await AsyncStorage.setItem('user', JSON.stringify(user) )     
    }




    async registerUser(person) {

      await runTransaction(db, async() => {
          
        let n =new GenerateRandoms();
        let pas = n.generatePassword(8);
          console.log(pas);

          createUserWithEmailAndPassword(auth, person.email, pas)

                      .then(async(userCredential) => {
                          const user = userCredential.user.uid;
                          this.AuthID = user;
                          console.log(this.AuthID);
                          await this.createUser(person, pas);
                            
                          
                      })
                      .catch((error) => {
                          const errorCode = error.code;
                          const errorMessage = error.message;
                          console.log(error);
                      });
      });
  }

  createUser = async (person,pas) =>{

      let collectionnn= collection(db, "Client");
      var mail = person.email;
      const newClient ={

          names: person.names,
          lastName: person.lastName,
          secondLastname: person.secondLastname,
          email: person.email,
          phone: person.phone,
          ci: person.ci,
          status: 1,
          gender: person.gender,
          registrationDate: serverTimestamp(),
          updateDate: serverTimestamp(),
      }

      await addDoc(collectionnn, newClient).then(async docRef=>{
          const userSys ={
                
              location: {
                  latitude: 34.0522,
                  longitude: -118.254
              },
              personRef: docRef,
              role: 0,
              status: 1,
              registrationDate: serverTimestamp(),
              updateDate: serverTimestamp(),
              userAuthId: this.AuthID
          };
          console.log("llegue aqui")
          
          await this.saveUser(userSys, mail,pas);
          return true;
      })

      


  }
 
  async saveUser (data){
      let mcollection = collection(db, "User");
      await addDoc(mcollection, data).then(docRef=>{
          return true;

       })          
  }
  

}
export default DataUser;































