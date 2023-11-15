import firebase from 'firebase/app';

import appFirebase  from "./firebaseConfig.js";

import { getFirestore,doc,getDoc,query,collection,where,getDocs, updateDoc, orderBy } from "firebase/firestore";

import Services from '../Models/ServicesModel.js'
import Nurse from '../Models/Nurse.js';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import MapMaker from '../Tools/Maper.js';
import Atention from '../Models/Atention.js';

const db = getFirestore(appFirebase);
const dbSt = getStorage(appFirebase);

class DataAtentionsAdmin{
isAllOk=false;
  listOfAtentions = [];
  async getAtentionList(n){
        
   
    const atentionCollectipn = collection(db, 'Atention');
    var q;
    await this.sleep(170);
    switch(n){
        case "1":
            q =   query(atentionCollectipn, where("status","==",1)); 

        break;
        case "3":
            
        q =  query(atentionCollectipn, where("status","==",1), orderBy("date","desc")); 

            break;
        

    }


    console.log("PAsé la query");
try {

  const querySnapshot = await getDocs(q);


  if (!querySnapshot.empty) {

    let promises = querySnapshot.docs.map(async(doc) => {
        console.log("ENtré al for");
        let client = await this.getUserAtention(doc.data().clientRef);
        let nurse = await this.getUserAtention(doc.data().nurseRef); //nurse
        let service = await this.getServiceAtention(doc.data().serviceRef);
        let myDate = await this.getFormattedData(doc.data().date);
        let m = new MapMaker();
        console.log("asigné");
        let adress = await m.getAddressFromCoordinates(doc.data().location.latitude, doc.data().location.longitude);

    var myAtention = new Atention(doc.id, doc.data().aditionalCost,client, myDate, doc.data().description,
                  doc.data().imageName,   doc.data().imageUrl, nurse,  
                  doc.data().physicalTest,   doc.data().reference , doc.data().serviceCurrentCost ,
                         service, 1,doc.data().treatment, adress
    );
    console.log("pasé el primer");

    console.log(myAtention);
    myAtention.valoration = doc.data().valoration;
    this.listOfAtentions.push(myAtention);
              
  });
  await Promise.all(promises);  

  console.log("Lo tengo");

  if(n ==2){ //ordenar por precio
    this.listOfAtentions.sort((a,b)=>{a.aditionalCost+a.serviceCurrentCost-(b.aditionalCost+b.serviceCurrentCost)});
  }
  else if (n==4) //nombre servicios
  {
    this.listOfAtentions.sort((a, b) => {
        
        
        if (a.serviceRef.name < b.serviceRef.name) {
          return -1;
        }
        if (a.serviceRef.name > b.serviceRef.name) {
          return 1;
        }
        return 0;
      })
  }
  else if (n==5) //nombre clientes
  {
    this.listOfAtentions.sort((a, b) => {
        
        
        if (a.clientRef.names < a.clientRef.names) {
          return -1;
        }
        if (a.clientRef.names > a.clientRef.names) {
          return 1;
        }
        return 0;
      })
  }
  else if( n==6){
    this.listOfAtentions.sort((a, b) => {
        
        
        if (a.nurseRef.names < a.nurseRef.names) {
          return -1;
        }
        if (a.nurseRef.names > a.nurseRef.names) {
          return 1;
        }
        return 0;
      })
  }
    return  this.listOfAtentions;
                    
  } 
  else {
    return [];
  }
} 
catch (error) {
    console.error('Error al consultar la base de datos:', error);
    return [];
}

}

async getAnAtenionByReference(refer){
        
   
  
      try {
        let doc = await getDoc(refer);

        let client = await this.getUserAtention(doc.data().clientRef);
        let nurse = await this.getUserAtention(doc.data().nurseRef); //nurse
        let service = await this.getServiceAtention(doc.data().serviceRef);
        let myDate = await this.getFormattedData(doc.data().date);
        let m = new MapMaker();
        console.log("asigné");
        let adress = await m.getAddressFromCoordinates(doc.data().location.latitude, doc.data().location.longitude);
  
    var myAtention = new Atention(doc.id, doc.data().aditionalCost,client, myDate, doc.data().description,
                  doc.data().imageName,   doc.data().imageUrl, nurse,  
                  doc.data().physicalTest,   doc.data().reference , doc.data().serviceCurrentCost ,
                         service, 1,doc.data().treatment, adress
    );
    console.log("pasé el primer");
  
    console.log(myAtention);
    myAtention.valoration = doc.data().valoration;
     return myAtention;
      } catch (error) {
        return undefined;
      }
    
            

}


   getServiceAtention= async(rrr)=>{
      let rr= await getDoc(rrr);
      return rr.data();
  }
  getUserAtention= async(rrr)=>{
    let rr= await getDoc(rrr);
      return rr.data();
     }

getFormattedData= async (date)=>{
    let datee = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = datee.toLocaleDateString('es-ES', options);
    return formattedDate;
}
sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
export default DataAtentionsAdmin;