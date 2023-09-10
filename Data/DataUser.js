import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs } from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import UserController from '../Controllers/UserController.js';
import Nurse from '../Models/Nurse.js';
import Person from '../Models/Person.js';
import User from '../Models/User.js';
const db = getFirestore(appFirebase);




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



    getUsers() {
        
    }
    getUsersById(){

    }

}
export default DataUser;































