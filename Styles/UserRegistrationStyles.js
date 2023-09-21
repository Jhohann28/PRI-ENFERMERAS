import { StyleSheet } from "react-native"

const stylesUserRegistration = StyleSheet.create({


  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#C5C5C5', // Fondo blanco
    alignItems:"center",
    alignItems: "center",
  }, 
  container2:{

    backgroundColor: "#6C98DB",
    padding:35,
    borderRadius:40,
    width:"100%",
    height: 662,
    marginTop: -190,
    
    
    
  },
  imageUser: {
    marginTop: -15,
    width: 410,
    height: 350,

  },

  textInput: {
    marginBottom: 16,
    backgroundColor: '#6C98DB',
    borderRadius: 8,
    fontSize: 15,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#315488',
    borderRadius: 5
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
    margin:5
  },
      //-----------------------ESTILOS PARA LAS ALERTAS DE VALIDACIONES-------------------------------\\
});
export {stylesUserRegistration};