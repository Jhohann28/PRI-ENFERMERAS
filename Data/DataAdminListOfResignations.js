import { getFirestore, collection, query, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";
import { appFirebase } from "./firebaseConfig"; // Asegúrate de importar tu configuración de Firebase
import { ref } from "firebase/storage";

class DataAdminListOfResignations {
  constructor() {
    this.db = getFirestore(appFirebase);
  }

  async getResignations() {
    const resignationsCollection = collection(this.db, 'resignations'); 
    const resignationsQuery = query(resignationsCollection);

    try {
      const querySnapshot = await getDocs(resignationsQuery);
     
      const resignationsData = [];

      const p = querySnapshot.docs.map(async(doc) => {

      
        const data = doc.data();
        let nurse = await getDoc(doc.data().nurseRef);
        
        let formattedDate = await this.getFormattedData(doc.data().date); 

        resignationsData.push({
            id:doc.id,
          date: formattedDate, 
          nurseRef: nurse.data(), 
          reason: data.reason,
          ref: doc.data().nurseRef
        });
      });

      await Promise.all(p);
      return resignationsData;
    } catch (error) {
      console.error("Error al obtener las renuncias:", error);
      return [];
    }
  }

    getFormattedData= async (date)=>{
        let datee = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formattedDate = datee.toLocaleDateString('es-ES', options);
        return formattedDate;
    }

    DeletResigntaion2 = async(id)=>{
        let reff = doc(this.db, 'resignations', id);
        await deleteDoc(reff);

     
    }


}

export default DataAdminListOfResignations;
