
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({

   
    myContainerImg:{
        width:200,
        height:200,
       // backgroundColor:"blue",
        justifyContent:"center" //claave, vertical,
        ,
        marginTop: 23,

    },
    myImg:{
        width:"100%",
        resizeMode:"contain",

    },

    myInputGroup:{
        width:"100%",
        alignItems:"center",
        marginTop:18,
    },
    myInputLabelBack:{
        width:300
        ,alignItems:"flex-start"
    },
    myInputLabel:{
        fontWeight:"bold",
        fontSize:17.4,
        color:"#090745"
    }
    ,
    myInputText:{
        marginTop:10,
        padding:1, //importante el padding
        width:300,
        fontSize:18,
        borderBottomColor:"#326695",
        borderBottomWidth:1,
        color:"#326695",
        fontWeight:"bold"

    },

    btnTypeFour:{
     backgroundColor:"#02D4A1",
     color:"white",
     padding:10,
     borderRadius:16,
     marginLeft:10,
     width:249
    },
    links:{
        textAlign:"center", 
        fontWeight:"bold", 
        color:"#312BD9",
    
        margin:5}

   
  });

  export default styles;