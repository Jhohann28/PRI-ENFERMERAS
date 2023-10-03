import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
 
    gradi:{
     
      flex: 1,
      padding:10,
      justifyContent:'center'
    },
    dataText:{
      fontSize:14
    },
    main:{
      backgroundColor:'white',
      padding:10,
      height:700,
      flexDirection:'column',
      borderRadius:10,
  
    },
    section:{
      backgroundColor:'#90B2EE',
      height:200,
      marginTop:10,
      borderRadius:10,
      padding:10
    },
    buttonsArea:{
      flexDirection:'row',
      padding:10,
      marginTop:70
    },
    buttonCall:{
      backgroundColor:'green',
      borderRadius:4,
      padding:5,
      margin:9,
      
    },
    buttonLow:{
      backgroundColor:'#3346FF',
      borderRadius:4,
      padding:5,
      margin:9
    },
    buttonDenied:{
      backgroundColor:'#FF4933',
      borderRadius:4,
      padding:5,
      margin:9
    },
    textButton:{
      color:'white'
    }
  }); export {styles}