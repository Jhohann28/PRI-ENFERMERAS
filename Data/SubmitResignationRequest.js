import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";

import { getFirestore,doc,getDoc,query,collection,where,getDocs, Timestamp, addDoc } from "firebase/firestore";

class ResignationData {
    constructor() {
        this.db = getFirestore(firebase);
      }
    
      async submitResignation(nurseName, reason) {
        try {
          if (!nurseName || !reason) {
            throw new Error('Por favor, ingresa un nombre y un motivo válidos');
          }
      
          const resignationsRef = collection(this.db, 'ResignationRequest');
          const timestamp = Timestamp.now();
      
          // Agrega el motivo, el nombre de la enfermera y la fecha a la base de datos
          await addDoc(resignationsRef, {
            nurseName: nurseName,
            reason: reason,
            timestamp: timestamp,
          });
      
          return 'Solicitud de renuncia enviada';
        } catch (error) {
          console.error('Error al enviar la solicitud de renuncia:', error.message);
          throw error;
        }
      }
      
}

export default ResignationData;