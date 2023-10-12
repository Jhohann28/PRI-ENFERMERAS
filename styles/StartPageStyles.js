
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({

    container:{
        alignItems:"center"
    },

    startHeader:{
        backgroundColor: "#064571",
        padding:19,
        marginTop: 24,
        borderRadius:10,
       width:"100%"
    },
    headerText:{
     color:"#fff",
     fontSize:27,
     textAlign:"center",
     fontWeight:"bold"

    },
    myContainerImg:{
        width:270,
        height:270,
       // backgroundColor:"blue",
        justifyContent:"center" //claave, vertical,
        ,
        marginTop: 23

    },
    myImg:{
        width:"100%",
        resizeMode:"contain",

    },

    containerHorizontal:
    {
        flexDirection:"row"
        ,
        marginTop:24
    },
    btnTypeOne:{
        backgroundColor:"#203F5D",
        color:"white",
        padding:10,
        borderRadius:16,
        marginLeft:10,
        width:249
    },
    btnTypeOneText:{
        color:"white",
        fontSize:19,
        fontWeight:"bold",
        textAlign:"center"
    },
    myIconsTypeOne:{
        marginTop:5
    },
    btnTypeTwo:{
        backgroundColor:"#96B4FF",
        color:"white",
        padding:10,
        borderRadius:16,
        marginLeft:10,
        width:249

    },
    btnTypeThree:{
        backgroundColor:"#FF5956",
        color:"white",
        padding:10,
        borderRadius:16,
        marginLeft:10,
        width:249

    },
    myScroll:{
        width:"100%",
        height:"80%"
    },
    startFooter:{
        backgroundColor: "#064571",
        padding:13,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
       width:"100%",
       height:"auto",
       marginBottom:0,
       marginTop:20,
       justifyContent:"flex-end",
       flex:1
   
    },
    footerText:{
        color:"#fff",
        fontSize:15,
        textAlign:"center",
        fontWeight:"bold",
       },
       uploadButton: {
        backgroundColor: '#D43A39',
        paddingHorizontal: 20,  // Ajusta según tus necesidades
        paddingVertical: 10,    // Puedes ajustar según tus necesidades
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,          // Puedes ajustar según tus necesidades
        width: 437,    
        borderRadius:10         // Puedes ajustar según tus necesidades
      },
    
      uploadButtonText: {
        color: '#fff',
        fontSize: 18,
      },
  });

  export default styles;