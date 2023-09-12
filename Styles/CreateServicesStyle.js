import { StyleSheet } from "react-native";

const createServiceStyle = StyleSheet.create({

    container: {
  
      flex: 1,
  
      backgroundColor: '#6B98C3',
  
      padding: 20,
  
    },
  
    title: {
  
      fontSize: 24,
  
      fontWeight: 'bold',
  
      color: '#060C47',
  
      marginTop: 30,
      marginBottom:20,
    },
  
    input: {
  
      borderWidth: 1,
  
      borderColor: '#A9A9A9',
  
      borderRadius: 5,
  
      padding: 10,
  
      marginBottom: 19,
      color:'#FDFEFE'
  
    },
    head:{
      backgroundColor:"#064571",
      padding:30,
      borderBottomLeftRadius:40,
      borderBottomRightRadius:40,
      width:"100%"
    },
    inputD:{
      borderWidth: 1,
  
      borderColor: '#A9A9A9',
  
      borderRadius: 5,
  
      padding: 10,
  
      marginBottom: 19,
      color:'#FDFEFE'
      
      
    }
  
  });
  export {createServiceStyle};