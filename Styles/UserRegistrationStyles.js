import { StyleSheet } from "react-native"

const stylesUserRegistration = StyleSheet.create({

    container: {
        padding: 16,
        backgroundColor: '#6B98C3', // Fondo blanco
        alignItems:"center",
        alignItems: "center",
      }, 
      container2:{
        backgroundColor: "#064571",
        padding:19,
        borderRadius:40,
        
        
        width:"100%"
    },
      
      
      startHeader:{
        backgroundColor: "#064571",
        padding:19,
        borderRadius:35,
        
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
      links:{
        textAlign:"center", 
        fontWeight:"bold", 
        color:"#000000",
    
        margin:5}
      
      
    
    
});
export {stylesUserRegistration};