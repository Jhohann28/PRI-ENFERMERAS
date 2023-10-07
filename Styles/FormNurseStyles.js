import { StyleSheet } from "react-native"

const stylesNf = StyleSheet.create({

    container: {
        padding: 16,
        backgroundColor: '#AEC4FC', // Fondo blanco
        alignItems:"center",
        height:"100%"
        
        
      },
      startHeader:{
       
        padding:19,
        borderRadius:40,
       width:"100%",
       marginBottom: 20
    
       
       
    },
    headerText:{
     color:"#fff",
     fontSize:27,
     textAlign:"center",
     fontWeight:"bold"

    },
      textInput: {
        marginBottom: 16,
        backgroundColor: '#96B4FF',
        borderRadius: 8,
        width: '200%', // Ajusta el ancho según tus necesidades
       
        fontSize: 18, // Ajusta el tamaño del texto según tus necesidades
        
      },
      button: {
        marginTop: 16,
        backgroundColor: '#D43A39',
        // Color principal para el botón
      },
      buttonText: {
        // Texto en blanco para el botón
      },
      label: {
        backgroundColor: '#FFFFFF',
        // Texto en blanco para el botón
      },
      dateTimePicker: {
        backgroundColor: '#AEC4FC', // Cambia el color de fondo según tus preferencias
      },
      dateTimePickerText: {
        color: '#333', // Cambia el color del texto según tus preferencias
      },
      links:{
        textAlign:"center", 
        fontWeight:"bold", 
        color:"#312BD9",
    
        margin:5},
        
      
      
    
    
});
export {stylesNf};