
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: "#DE0000",
      justifyContent: 'flex-start', 
    },
    header: {
      backgroundColor: '#0C124E',
      width: '100%',
      height: "10%",
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
      paddingTop:30
    },
    headerText: {
      color: '#fff',
      fontSize: 26,
      fontWeight: 'bold'
    },
    miScroll:{
      color:"white",
      backgroundColor: "#DE0000",
      width: '100%',
      height:200,
      paddingBottom:0
  
     
    },
    containerImg:{
      width:"100%",
      height: 290,
      alignItems:"center",
      justifyContent:'center',
     
    }
    ,
    imgnStart:{
      flex:1,
     
      resizeMode:"contain",
      marginTop:10,
      width:300,
      height:300
  
    },
    containerButtons:{
      width:"100%",
      justifyContent:"flex-start",
      alignItems:"center",
      flexDirection:"row",
      marginTop:0,
      marginBottom:5
    },
    Btn:{
      backgroundColor:"#0C124E",
      borderRadius:22,
      width:"45%",
      margin:10,
      alignItems:'center',
      justifyContent:"center",
      height:102
  
    },
    imgsBtns:{
      flex:1,
      width:"80%",
    }
    , 
    containerAllButtons:{
      height:"45%",
      alignItems:'center',
      justifyContent:"center",
    },
    Tittle:{
      
      backgroundColor:"#0C124E",
      borderRadius:15,
      color:"white",
      alignItems:"center",
      justifyContent:"center",
      margin:10,
      padding:14
    },
    tittleText:{
      textDecorationLine:"underline",
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
     textAlign:"center"
    },
    bodyNotice:{
      backgroundColor:"#0C124E",
      borderRadius:15,
      color:"white",
      alignItems:"center",
      justifyContent:"center",
      margin:10
    },
    TextBody:{
      color:"black",
      alignItems:"flex-start",
      justifyContent:"center",
     textAlign:"left",
     fontSize: 19
  
    },
    TextBodyA:{
      color:"white",
      alignItems:"flex-start",
      justifyContent:"center",
     textAlign:"left",
     fontSize: 16,
    marginLeft: 14
    }
  });

  export default styles;