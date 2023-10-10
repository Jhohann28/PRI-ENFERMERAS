import { StyleSheet } from "react-native"
const stylesComplaint = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0B2B42', // Color de fondo del contenedor principal
      padding: 20,
    },
    label: {
      fontSize: 24,
      marginBottom: 5,
      color: '#FFFFFF', // Cambio de color del título a blanco
    },
    input: {
      height: 350, // Aumenta la altura del área de entrada de texto
      width: '100%',
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      fontSize: 18, // Aumenta el tamaño del texto del área de entrada de texto
      backgroundColor: '#AEC4FC', // Color de fondo para el área de entrada de texto
      borderRadius: 10, // Bordes redondeados
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    button: {
      borderRadius: 20,
      fontSize:30,
       // Bordes redondeados para los botones
    },
  });
  export { stylesComplaint };