import { StyleSheet } from "react-native"
const stylesN = StyleSheet.create({
    container: {
      
      flex: 1,
      backgroundColor: '#c4dafa', // Fondo verde azulado
    },
    form:{
      padding:10
    }
    ,
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
      backgroundColor: '#064571', // Nuevo color del botón
      padding: 15,
      borderRadius: 10, // Bordes redondeados
      alignItems: 'center',
    },
    button2: {
      backgroundColor: 'green', // Nuevo color del botón
      padding: 4,
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
      backgroundColor: "#064571",
      padding:19,
      borderRadius:10,
      
     width:"100%"
  },
  headerText:{
   color:"white",
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