import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs } from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import UserController from '../Controllers/UserController.js';
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
        const q = query(usersCollection, where('userAuthId', '==', this.AuthID), where('role', '==', role));
      
        try {
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                  console.log('Document data:', doc.data());
            });
          } else {
            return console.log("No tiene acceso a estas funcionalidades");
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































