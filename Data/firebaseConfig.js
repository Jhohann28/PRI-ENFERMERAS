// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzqFMfz2JwI42xZIc2dur98dax_v5UoFc",
  authDomain: "pri-enfermeras-daaae.firebaseapp.com",
  projectId: "pri-enfermeras-daaae",
  storageBucket: "pri-enfermeras-daaae.appspot.com",
  messagingSenderId: "538616007752",
  appId: "1:538616007752:web:cf3dd3d2e66dfb60f39c7d",
  measurementId: "G-2N42SVWYEC"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(appFirebase);

export default appFirebase;

