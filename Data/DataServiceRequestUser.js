
import appFirebase  from "./firebaseConfig.js";
import { getFirestore,doc,addDoc,getDoc,query,collection,where,getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import AtentionRequest from '../Models/AtentionRequest.js';
import { getAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage, getDownloadURL, deleteObject, storage,ref, uploadBytes } from "firebase/storage"; 
import { getDatabase, set } from "firebase/database";


const db = getFirestore(appFirebase);
const db2 = getDatabase(appFirebase);
const auth = getAuth();
const dbSt = getStorage(appFirebase);
let requestsRef = ref(dbSt, 'AtentionRequest');



class DataServiceRequestUser {
    URL;
    addRef;
    flag = false;   
    async sendRequest(requestData) {

        try {
            const userRef = await AsyncStorage.getItem("user");
            if (userRef) {
                const userAuthID = JSON.parse(userRef)?.userAuthID; 
                if (userAuthID) {
                    const usersCollection = collection(db, 'User');
                    const q = query(usersCollection, where('userAuthId', '==', userAuthID)); //0 user, 1 admin, 2 nurse
              
                
                    const querySnapshot = await getDocs(q);
                    let referToPerson=""; var finalUser;
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {

                          referToPerson = doc.ref; 
                    })}

                    console.log(referToPerson);

                    await updateDoc(referToPerson,
                        {location: {latitude: requestData.latitude, longitude: requestData.longitude}});

                    const serviceRequest = {
                        date: serverTimestamp(),
                        description: requestData.description,
                        imageName: requestData.imageName || "",
                        imageUrl: this.URL || "",
                        serviceRef: requestData.serviceRef,
                        status: 1,
                        updateDate: serverTimestamp(),
                        userRef: referToPerson, 
                    };

                    const serviceRequestCollection = collection(db, "AtentionRequest");

                    const ref = await addDoc(serviceRequestCollection, serviceRequest);

                    this.addRef = ref.id;

                    this.flag = true;

                    console.log("Solicitud de servicio enviada con éxito");

                    console.log("ID del requerimiento 2: ", this.addRef);

                  
                    return ref.id;

                } else {
                    console.error("No se encontró la AuthID en la referencia al usuario en el almacenamiento local");
                }
            } else {
                console.error("No se encontró la referencia al usuario en el almacenamiento local");
            }  

        } catch (error) {
            console.error('Error al enviar la solicitud de servicio:', error);
        
        }  

        
  }


    uploadFileToStorage = async (fileName, filePath, r) => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
  
      
      const storageRef = ref(dbSt, `ServicesRequests/${fileName}`);

      await uploadBytes(storageRef, blob)
            .then((snapshot) => {
                console.log('Archivo subido con éxito');
                // Puedes obtener la URL de descarga del archivo
                return getDownloadURL(snapshot.ref);
            })
            .then(async(downloadURL) => {
                console.log('URL de descarga del archivo:', downloadURL);
                this.URL = downloadURL;
                this.addRef = await this.sendRequest(r);
            })
      
      /*await uploadBytes(storageRef, blob);
  
      console.log('Archivo subido con éxito a la carpeta "ServiceRequests"');*/
  
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  };

  async updateCancelAttention (id) {

    const washingtonRef = doc(db, "AtentionRequest", id);
  
      await updateDoc(washingtonRef, {
        status: 0
      });
    }
    
}

export default DataServiceRequestUser;
