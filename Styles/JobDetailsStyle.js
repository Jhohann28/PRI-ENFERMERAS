import { StyleSheet } from "react-native"
const stylesDetails = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white', // Fondo azul
    padding: 30, // Ajusta el espacio alrededor del contenido
  },
  itemContainer: {
    marginBottom: 10,
    padding:10
  },
  itemInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
   

  },
  itemDetails: {
    flex: 1
    
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Espacio entre los botones y el contenido superior
    alignSelf:'center',
  },
  button: {
    padding: 5,
    borderRadius: 5,
    width:"100%"
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:"center"
  },
});
  export {stylesDetails};