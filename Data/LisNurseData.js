import firebase from 'firebase/app';

import appFirebase  from "./firebaseConfig.js";

import { getFirestore,doc,getDoc,query,collection,where,getDocs, updateDoc } from "firebase/firestore";

import Services from '../Models/ServicesModel.js'
import Nurse from '../Models/Nurse.js';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const db = getFirestore(appFirebase);
const dbSt = getStorage(appFirebase);

class ListNurseData{
isAllOk=false;
  nurseList = [];
  async  getNurses() {

    const serviceCollection = collection(db, 'Nurse');

    const q = query(serviceCollection, where('status', '==', 1)); 

    try {

      const querySnapshot = await getDocs(q);


      if (!querySnapshot.empty) {

        const p= querySnapshot.docs.map(async(doc) => {

        let dta =  await this.getFormattedData( doc.data().titulationDate);
        console.log(dta);
        let curriculum ={
          curriculumUrl: doc.data().curriculumUrl,
          curriculumName: doc.data().curriculumName
        }
        let nurse = new Nurse(doc.data().names,doc.data().lastName, doc.data().secondLastName, doc.data().email,
        doc.data().phone, doc.data().ci, 1, doc.data().speciality, dta, doc.data().graduationInstitution,curriculum
        );

        nurse.id= doc.id;
                
        console.log(doc.id);

           //cálculos
           const usersCollection =await  collection(db, 'Atention');
           const q = await query(usersCollection, where("nurseRef", '==', doc.ref));
         console.log("aquíiii");
           try {
             const querySnapshot = await getDocs(q);
            var quantityAtentions=0;
            var amount =0;
             if (!querySnapshot.empty) {
               const prom =  querySnapshot.docs.map(async (doc2) => {
                console.log("hola");
                        quantityAtentions++;
                        amount= await doc2.data().serviceCurrentCost+doc2.data().aditionalCost+ amount;
   
               });
               await Promise.all(prom);
            }
            nurse.quantityAtentions = quantityAtentions;
            nurse.amount = amount;
            this.nurseList.push(nurse);

        
        }
            catch(er){
                    console.error(er);
            }


                  
      });
      await Promise.all(p);
        return  this.nurseList;
                        
      } 
      else {
        return [];
      }
    } 
    catch (error) {
        console.error('Error al consultar la base de datos:', error);
    }
  }

 

  async DeleteRequest(id,curriculumname){
    const mrequestRef = doc(db, "Nurse", id);
    this.isAllOk = false;
    //let req = await getDoc(mrequestRef);
    try {
      const desertRef = ref(dbSt, 'JobRequests/'+curriculumname);
      await  deleteObject(desertRef).then(async() => {
          await   updateDoc(mrequestRef,{status:0});

       console.log("Eliminado");
       this.isAllOk=true;
       return true;
       }).catch(async(error) => {
          try {
            await updateDoc(mrequestRef,{status:0});
            this.isAllOk = true;
            return true;
          } catch (error) {
        console.log("Error 2: ",error);

           return error;
            
          }
       });
    } catch (error) {
      console.log(error);
      try {
        await updateDoc(mrequestRef,{status:0});
       this.isAllOk=true;

        return true;
      } catch (error) {
        console.log("Error 3: ",error);
        return error;
        
      }
    }
 

  }


  getFormattedData= async (date)=>{
    let datee = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = datee.toLocaleDateString('es-ES', options);
    return formattedDate;
    }
}

export default ListNurseData;