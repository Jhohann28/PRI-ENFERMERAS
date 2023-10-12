import { StyleSheet } from "react-native"
const stylesExpanded = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#326695', // Fondo azul
    padding: 30, // Ajusta el espacio alrededor del contenido
    
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  itemDetails: {
    flex: 1,
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
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
  export {stylesExpanded};