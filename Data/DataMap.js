
import appFirebase  from "./firebaseConfig.js";

import AtentionRequest from '../Models/AtentionRequest.js';
import { getAuth } from 'firebase/auth';

import { getDatabase, set, ref } from "firebase/database";



const db2 = getDatabase(appFirebase);
const auth = getAuth();




class DataMap {
    
    writeLocationUser(locationUser,  idRequest) {
     
  
        set(ref(db2, 'locations/' + idRequest+"/userLocation"), {
  
          latitude: locationUser.latitude,
  
          longitude: locationUser.longitude
  
        });
  
      }
    
}

export default DataMap;
