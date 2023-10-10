import { StyleSheet } from "react-native"
const stylesN = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: '#98C7BE', // Fondo verde azulado
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
    headerText:{
      fontSize: 25,
      marginBottom: 20,
      color: 'black',
      textAlign:'center',
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