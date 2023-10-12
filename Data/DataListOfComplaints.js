import firebase from 'firebase/app';

import appFirebase  from "./firebaseConfig.js";

import { getFirestore,doc,getDoc,query,collection,where,getDocs, updateDoc } from "firebase/firestore";

import Services from '../Models/ServicesModel.js'
import Complaints from '../Models/ComplaintModel.js';

import MapMaker from '../Tools/Maper.js';

import Atention from '../Models/Attention.js';

const db = getFirestore(appFirebase);




class DataListOfComplaints {
    complaintsList = [];
  
    async getComplaints() {
      const complaintCollection = collection(db, 'Complaint');
  
      try {
        const querySnapshot = await getDocs(complaintCollection);
  
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async(doc) => {
            let complaint = new Complaints(
              doc.id,
              doc.data().atentionRef,
              doc.data().clientName,
              doc.data().date,
              doc.data().description
            );
  
            console.log(doc.id);
            complaint.date = await this.getFormattedData(complaint.date);
            this.complaintsList.push(complaint);
          });
  
          return this.complaintsList;
        } else {
          return "No hay quejas";
        }
      } catch (error) {
        console.error('Error al consultar la base de datos:', error);
      }
    }
    getFormattedData = async (date) => {

        let datee = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formattedDate = datee.toLocaleDateString('es-ES', options);
        return formattedDate;
    }

    async getAnAtenionByReference(refer){ try { let doc = await getDoc(refer); 
      let client = await this.getUserAtention(doc.data().clientRef); 
      let nurse = await this.getUserAtention(doc.data().nurseRef); 
      //nurse 
      let service = await this.getServiceAtention(doc.data().serviceRef); 

      let myDate = await this.getFormattedData(doc.data().date); let m = new MapMaker(); 

      console.log("asigné"); 
      let adress = await m.getAddressFromCoordinates(doc.data().location.latitude, doc.data().location.longitude); 
      var myAtention = new Atention(doc.id, doc.data().aditionalCost,client, myDate, doc.data().description, doc.data().imageName, doc.data().imageUrl, nurse, doc.data().physicalTest, doc.data().reference , doc.data().serviceCurrentCost , service, 1,doc.data().treatment, adress ); 
      console.log("pasé el primer"); console.log(myAtention); 
      myAtention.valoration = doc.data().valoration; 
      return myAtention; } 
      
      catch (error) {console.log(error); return undefined; } }


      getServiceAtention= async(rrr)=>{

        let rr= await getDoc(rrr);
  
        return rr.data();
  
    }
  
    getUserAtention= async(rrr)=>{
  
      let rr= await getDoc(rrr);
  
        return rr.data();
  
       }
  
   
  
 




  }

export default DataListOfComplaints;