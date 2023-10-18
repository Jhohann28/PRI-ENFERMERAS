import { StyleSheet } from "react-native"
const stylesNf = StyleSheet.create({
    container: {
      
     
      backgroundColor: '#9eedfc', 
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
   fontWeight:"bold",
   

  },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },
    dateTimePicker: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',  // Cambia el color de fondo según tus preferencias
      borderRadius: 8,
      marginTop: 10,
      marginBottom: 20,
      padding: 10,
    },
  
    dateTimePickerText: {
      color: '#333',  // Cambia el color del texto según tus preferencias
      fontSize: 16,   // Ajusta el tamaño del texto según tus necesidades
      textAlign: 'center',
      marginLeft: 10,  // Espacio entre el ícono y el texto
    },
  
    calendarIcon: {
      marginRight: 10,  // Espacio entre el ícono y el borde derecho del contenedor
    },
    validationMessage: {
      color: 'red',
      fontSize: 12,
      marginTop: 5, // Espacio entre el mensaje de validación y el TextInput
    },
  
    
    
  });

  export { stylesNf };