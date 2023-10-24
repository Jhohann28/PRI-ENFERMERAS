
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,addDoc,getDoc,query,collection,where,getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import AtentionRequest from '../Models/AtentionRequest.js';
import { getAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, getDownloadURL, deleteObject, storage,ref, uploadBytes } from "firebase/storage"; 
import { getDatabase, set } from "firebase/database";


const db = getFirestore(appFirebase);


class ResignationData {

  async sendResignations(resignationData) {
    try {
      const userRef = await AsyncStorage.getItem("user");
      if (userRef) {
        const userAuthID = JSON.parse(userRef)?.userAuthID;
        if (userAuthID) {
          const usersCollection = collection(db, 'User');
          const q = query(usersCollection, where('userAuthId', '==', userAuthID));

          const querySnapshot = await getDocs(q);
          let referToPerson = "";
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              referToPerson = doc.data().personRef;
            });

         
            const resignationsCollection = collection(db, 'resignations'); 
            await addDoc(resignationsCollection, {
              reason: resignationData.reason,
              date: serverTimestamp(),
              nurseRef: referToPerson,
            });

            console.log("Solicitud de renuncia enviada con éxito.");
          } else {
            console.error("No se encontró la AuthID en la referencia al usuario en el almacenamiento local");
          }
        } else {
          console.error("No se encontró la referencia al usuario en el almacenamiento local");
        }
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de renuncia:", error);
    }
  }


}

export default ResignationData;