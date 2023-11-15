
import firebase from 'firebase/app';
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,getDoc,query,collection,where,getDocs, setDoc, serverTimestamp, addDoc, runTransaction, Transaction, onSnapshot, updateDoc} from "firebase/firestore";


import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { getStorage,  uploadBytes, getDownloadURL, deleteObject, ref } from "firebase/storage"




const dbSt = getStorage(appFirebase);
const db = getFirestore(appFirebase);

class NurseAtentionDataForm{
  
     


registerAtentionByFiles = async (fileName, filePath, data) => {
  try {
    const response = await fetch(filePath);
    const blob = await response.blob();

    
    const storageRef = ref(dbSt, `AtentionsReports/${fileName}`);

   let res = await uploadBytes(storageRef, blob)
          .then((snapshot) => {
              console.log('Archivo subido con éxito');
             
              return getDownloadURL(snapshot.ref);
              return true;
          })
          .then(async(downloadURL) => {
              console.log('URL de descarga del archivo:', downloadURL);
           
              let r = await this.registerWithOutFiles(fileName, downloadURL, data);
              return r;
          })   
          .catch(()=>{
            return false;
          })
          return res;

  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return false;
  }
};

registerWithOutFiles=async(fileName, filePath, data)=>{

    const mrequestRef = doc(db, "Atention", data.id);
    const mrequestRef2 = doc(db, "AtentionRequest", data.id);
    

   
      let myRes=  await updateDoc(mrequestRef, {
          status: 2,
          aditionalCost: Number.parseFloat(data.aditionalCost),
          description: data.description,
          imageName: fileName,
          imageUrl: filePath,
          physicalTest: data.physicalTest,
          reference: data.reference,
          treatment: data.treatment,
          valoration: 0



        }).then(async()=>{

          return true;

         
        })
        .catch(()=>{
            return false;
        })
        
        ;

        myRes = await updateDoc(mrequestRef2,{
          status:6
        }).then(async()=>{

          return true;

         
        })
        .catch(()=>{
            return false;
        })
        
        return myRes;

}

}
export default NurseAtentionDataForm;