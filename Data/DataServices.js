import firebase from 'firebase/app';

import appFirebase  from "./firebaseConfig.js";

import { getFirestore,doc,getDoc,query,collection,where,getDocs, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";

import Services from '../Models/ServicesModel.js'

const db = getFirestore(appFirebase);




class DataServices{
  //------------------------metodo para poder listar y vizualizar los servicios----------------------------\\
  servicesList = [];
  async  getServices() {

    const serviceCollection = collection(db, 'Services');

    const q = query(serviceCollection, where('status', '==', 1)); //0 user, 1 admin, 2 nurse

    try {

      const querySnapshot = await getDocs(q);


      if (!querySnapshot.empty) {

        querySnapshot.forEach((doc) => {
        let service = new Services(doc.id, doc.data().name, doc.data().price, doc.data().description, doc.data().status);
        //aquí añadí a tu lista de services
                    
        console.log(doc.id);
        this.servicesList.push(service);
                  
      });
      
        return  this.servicesList;
                        
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
  async updateServices (id) {

  const washingtonRef = doc(db, "Services", id);

    await updateDoc(washingtonRef, {
      status: 0
    });
  }

  async updateServicesAll (data) {

    const washingtonRef = doc(db, "Services", data.id);
  
      await updateDoc(washingtonRef, {
        updateDate: serverTimestamp(),
        name: data.name,
        description: data.description,
        price: parseFloat( data.price)


      });
    }
  
    async AddService (data){
      const washingtonRef = collection(db, "Services"); //así es pa ref completa sin id

      let myData ={
        name: data.name,
        description: data.description,
        price: parseFloat( data.price),
        status: 1,
        registrationDate: serverTimestamp(),
        updateDate: serverTimestamp()
      }
      await addDoc(washingtonRef, myData).then((doc)=>{
        console.log("doc añadido: "+ doc.id)
      })
      .catch((err)=>{
        console.log(err);
      })

    }
}

export default DataServices;