import firebase from 'firebase/app';

import appFirebase  from "./firebaseConfig.js";

import { getFirestore,doc,getDoc,query,collection,where,getDocs, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";

import Services from '../Models/ServicesModel.js'

const db = getFirestore(appFirebase);




class DataReports{
  //------------------------metodo para poder listar y vizualizar los servicios----------------------------\\
  
  
  nursesReportsList=[];
  usersReportsList=[];
  servicesReportsList=[];

  async  getReportNurses() {

    this.nursesReportsList=[];

    const nurseColl = collection(db, 'Nurse');
    


    const q = query(nurseColl, where('status', '==', 1));


    try {

      const querySnapshot = await getDocs(q);


      if (!querySnapshot.empty) {

        const promises = querySnapshot.docs.map( async(nurse) => {
            

        const atentionCollection = collection(db, 'Atention');
            


        const q2 = query(atentionCollection, where('status', '==', 1), where ("nurseRef","==",nurse.ref));
        const querySnapshot2 = await getDocs(q2);
        let nAtentions =0; let totalWon =0;
            let promises2 = querySnapshot2.docs.map(async(atention)=>{

                nAtentions++;
                totalWon= totalWon+ atention.data().aditionalCost + atention.data().serviceCurrentCost
            })

            await Promise.all(promises2);
            let nursee = {
                names: nurse.data().names+" "+nurse.data().lastName,
                nAtentions: nAtentions,
                totalWon: totalWon
            }

            this.nursesReportsList.push(nursee);
                  console.log("Añadiendo jeje", nursee);
           
      });
      
      await Promise.all(promises );
                        
      } 
      else {
        return [];
      }
    } 
    catch (error) {
        console.error('Error al consultar la base de datos:', error);
    }
  }


  async  getReportServices() {

    this.servicesReportsList=[];

    const userColl3 = collection(db, 'Services');
    


    const q11 = query(userColl3, where('status', '==', 1));


    try {

      let querySnapshot = await getDocs(q11);


      if (!querySnapshot.empty) {

        const promises = querySnapshot.docs.map( async(s) => {
            

        const atentionCollection1 = collection(db, 'Atention');
            


        const q22 = query(atentionCollection1, where('status', '==', 1), where ("serviceRef","==",s.ref));
        const querySnapshot22 = await getDocs(q22);
        let nAtentions =0; let totalWon =0;
            let promises2 = querySnapshot22.docs.map(async(atention)=>{

                nAtentions++;
            })

            await Promise.all(promises2);
            let ser = {
                names: s.data().name,
                nAtentions: nAtentions
                
            }

            this.servicesReportsList.push(ser);
                  console.log("Añadiendo jeje", ser);
           
      });
      await Promise.all(promises );
      
                        
      } 
      else {
        return [];
      }
    } 
    catch (error) {
        console.error('Error al consultar la base de datos:', error);
    }
  }

  async  getReportUsers() {

    this.usersReportsList=[];

    const userColl = collection(db, 'Client');
    


    const q1 = query(userColl, where('status', '==', 1));


    try {

      let querySnapshot = await getDocs(q1);


      if (!querySnapshot.empty) {

        const promises = querySnapshot.docs.map( async(client) => {
            

        const atentionCollection1 = collection(db, 'Atention');
            


        const q2 = query(atentionCollection1, where('status', '==', 1), where ("clientRef","==",client.ref));
        const querySnapshot2 = await getDocs(q2);
        let nAtentions =0; let totalWon =0;
            let promises2 = querySnapshot2.docs.map(async(atention)=>{

                nAtentions++;
                totalWon= totalWon+ atention.data().aditionalCost + atention.data().serviceCurrentCost
            })

            await Promise.all(promises2);
            let clientt = {
                names: client.data().names+" "+client.data().lastName,
                nAtentions: nAtentions,
                totalWon: totalWon
            }

            this.usersReportsList.push(clientt);
                  console.log("Añadiendo jeje", clientt);
          
      }
      );
      await Promise.all(promises );
      
      
                        
      
    } 
      else {
        return [];
      }
    } 
    catch (error) {
        console.error('Error al consultar la base de datos:', error);
    }
  }

}

export default DataReports;