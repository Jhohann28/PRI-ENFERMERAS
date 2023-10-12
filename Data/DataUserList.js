import firebase from 'firebase/app';

import appFirebase  from "./firebaseConfig.js";

import { getFirestore,doc,getDoc,query,collection,where,getDocs, updateDoc } from "firebase/firestore";

import Services from '../Models/ServicesModel.js'
import Person from '../Models/Person.js';
import PersonModel from '../Models/PersonModel.js';
const db = getFirestore(appFirebase);




class DataUserList{
  //------------------------metodo para poder listar y vizualizar los servicios----------------------------\\
  userList = [];
  async  getUsers() {

    const serviceCollection = collection(db, 'Client');

    const q = query(serviceCollection, where('status', '==', 1)); //0 user, 1 admin, 2 nurse

    try {

      const querySnapshot = await getDocs(q);


      if (!querySnapshot.empty) {

        querySnapshot.forEach((doc) => {
        
        let dta = this.getFormattedData(doc.data().registrationDate)
        let client = new PersonModel(doc.data().names, doc.data().lastName, doc.data().secondLastName, doc.data().email, doc.data().phone, doc.data().ci, 1, doc.data().gender);
        
        client.id = doc.id;
        client.registrationDate = dta;

        console.log(doc.id);
        this.userList.push(client);
                  
      });
      
        return  this.userList;
                        
      } 
      else {
        return "No hay services";
      }
    } 
    catch (error) {
        console.error('Error al consultar la base de datos:', error);
    }
  }

  //------------------metodo para poder desactivar servicios--------------------------\\
  async updateChangeStatus (id) {

  const washingtonRef = doc(db, "Client", id);

    await updateDoc(washingtonRef, {
      status: 0
    });
  }

    getFormattedData = async (date) => {

    let datee = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = datee.toLocaleDateString('es-ES', options);
    return formattedDate;
}
  
}

export default DataUserList;