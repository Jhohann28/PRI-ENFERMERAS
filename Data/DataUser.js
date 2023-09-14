import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList} from 'react-native';

//------------------------SECCION DE CONEXION A BDD---------------------------------\\
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {appFirebase}  from "./firebaseConfig.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore,doc,getDoc,addDoc, runTransaction,query,collection,where,getDocs, updateDoc, serverTimestamp, firestore} from "firebase/firestore";
//--------------------------------------------------------------------------------------------------------------------------------
const db = getFirestore(appFirebase);
const auth = getAuth();


class DataUser {
    AuthID; 
    async registerUser(person) {

        await runTransaction(db, async() => {
            
   
            let pas = this.generarContraseña(8);
            console.log(pas);

            createUserWithEmailAndPassword(auth, person.email, pas)

                        .then((userCredential) => {
                            const user = userCredential.user.uid;
                            this.AuthID = user;
                            console.log(this.AuthID);
                            this.createUser(person, pas)
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(error);
                        });
        });
    }

    createUser = async (person) =>{

        let collectionnn= collection(db, "Client");

        const newClient ={

            names: person.names,
            lastName: person.lastName,
            secondLastname: person.secondLastname,
            email: person.email,
            phone: person.phone,
            ci: person.ci,
            status: 1,
            gender: person.gender,
            registrationDate: serverTimestamp(),
            updateDate: serverTimestamp(),
        }

        await addDoc(collectionnn, newClient).then(docRef=>{
            const userSys ={
                  
                location: {
                    latitude: 34.0522,
                    longitude: -118.254
                },
                personRef: docRef,
                role: 0,
                status: 1,
                registrationDate: serverTimestamp(),
                updateDate: serverTimestamp(),
                userAuthId: this.AuthID
            };
            console.log("llegue aqui")
            let msaveuser = new DataUser();
            msaveuser.saveUser(userSys);
            return true;
        })

        


    }
   
    async saveUser (data){
        let mcollection = collection(db, "User");
        await addDoc(mcollection, data).then(docRef=>{
            return true;

         })          
    }
    generarContraseña(longitud) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let contraseña = '';
      
        for (let i = 0; i < longitud; i++) {
          const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
          contraseña += caracterAleatorio;
        }
        return contraseña;
    }
}

export default DataUser;

