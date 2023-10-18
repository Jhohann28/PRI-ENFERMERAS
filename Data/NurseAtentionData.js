
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
               status: 5,
               userNurseRef: await this.getUserRef(auth)
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
     async UserFound(id, auth){
      const mrequestRef = doc(db, "AtentionRequest", id);
      let req = await getDoc(mrequestRef);

     
         await updateDoc(mrequestRef, {
            status: 3 // 3 is atempted
            


          }).then(async()=>{
            const washingtonRef = collection(db, "Atention"); 

            let myData ={
              status :0,
              atentionRequestRef: mrequestRef,
              date: serverTimestamp()
            }
            await addDoc(washingtonRef, myData).then((doc)=>{
              console.log("doc añadido: "+ doc.id)
            })
            .catch((err)=>{
              console.log(err);
            })
          });

      
     }
     async getUserRef(AuthID){
      console.log(AuthID);
      const usersCollection = collection(db, 'User');
      const q = query(usersCollection, where('userAuthId', '==', AuthID)); 
    
      try {
        const querySnapshot = await getDocs(q);
        let referToPerson="";
        if (!querySnapshot.empty) {
          const promises=  querySnapshot.docs.map(async (doc) => {
         
              referToPerson = await doc.ref;
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
  
}
export default NurseAtentionData;