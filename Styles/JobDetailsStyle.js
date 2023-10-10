import { StyleSheet } from "react-native"
const stylesDetails = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    itemContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 8,
    },
    itemDetails: {
      flex: 1,
    },
    itemText: {
      marginBottom: 4,
    },
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      padding: 8,
      borderRadius: 5,
      marginLeft: 8,
      
    },
    buttonText: {
      color: '#fff',
    },
    itemContainer:{
        backgroundColor: '#9FC4EF',
    },
  });
  export {stylesDetails};