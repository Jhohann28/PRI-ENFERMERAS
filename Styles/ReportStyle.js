import { StyleSheet } from "react-native"
const stylesN = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: '#a2c8cc', // Fondo verde azulado
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      color: 'black',
      
      
    },
    
    section: {
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      marginBottom: 5,
      color: 'black',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      color: 'black',
      borderRadius: 8,
    },
    textarea: {
      height: 100,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      color: 'black',
      borderRadius: 8,
      textAlignVertical: 'top', 
    },
    
    button: {
      backgroundColor: '#26ADEE', // Nuevo color del botón
      padding: 15,
      borderRadius: 10, // Bordes redondeados
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 10,
      borderRadius: 10,
    },
    startHeader:{
      backgroundColor: "#338b85",
      padding:19,
      borderRadius:10,
      
     width:"100%"
  },
  headerText:{
   color:"black",
   fontSize:27,
   textAlign:"center",
   fontWeight:"bold"

  },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },
  
    
    
  });

  export { stylesN };