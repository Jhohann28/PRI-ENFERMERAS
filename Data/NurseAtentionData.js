
import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot, updateDoc} from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";



const db = getFirestore(appFirebase);
const db2 = getDatabase(appFirebase);
class NurseAtentionData{
   r;
    writeLocationNurse(locationNurse,  idRequest) {
      const db = getDatabase();
      set(ref(db, 'locations/' + idRequest+"/nurseLocation"), {
        latitude: locationNurse.latitude,
        longitude: locationNurse.longitude
      });
    }


    async IsStillDisponible(atention){
    
      try {
       
         const mrequestRef = doc(db, "AtentionRequest", atention.id);
         let req = await getDoc(mrequestRef);

         if(req.data().status ==1){
            await updateDoc(mrequestRef, {
               status: 5
             });
             this.writeLocationNurse(atention.userRef.location,atention.id)

             return true;
         }
         else{
            return false;
         }
        

       }
       catch(er){
         console.log(er);
         return false;
       }
   
   }

     async UserNotFound(id){
      const mrequestRef = doc(db, "AtentionRequest", id);
      let req = await getDoc(mrequestRef);

    
         await updateDoc(mrequestRef, {
            status: 4 // 4 is not found
          });

      
     }
     async UserFound(id){
      const mrequestRef = doc(db, "AtentionRequest", id);
      let req = await getDoc(mrequestRef);

     
         await updateDoc(mrequestRef, {
            status: 3 ,// 3 is atempted
            
          });

      
     }
  
}
export default NurseAtentionData;