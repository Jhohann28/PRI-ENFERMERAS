import { StyleSheet } from "react-native";

const ViewRequestStyle = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#C7E0F4',
      alignItems: 'center',
    },
    pdf:{
      flexDirection:'row'
    },
    container2:{
      flexDirection:'row'
    }
    ,
    title:{
      marginRight:0,
      marginTop:50,
      fontSize:20,
      color:'#080F75'
    },
    card: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      marginTop: 20,
      borderRadius: 10,
      width: '80%',
      marginBottom:30,
      height:500,
      width:360
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    experience: {
      fontSize: 18,
      marginBottom: 10,
    },
    especialidad:{
      fontSize: 18,
      marginBottom: 10,
    },
    telefono:{
      fontSize: 18,
      marginBottom: 10,
    },
    curriculum: {
      fontSize: 18,
      marginRight:20,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    icon:{
      marginTop:50,
      height:100,
      width:100,
      marginLeft:30
    },
    button:{
      padding:15,
      backgroundColor:"#0F0DE8",
      borderRadius:8
    },
    textButton:{
      color:'#fff',
      textAlign:'center'
    },
    buttonAceptar:{
      padding:15,
      backgroundColor:"#1BB011",
      borderRadius:8
    },
    buttonRechazar:{
      padding:15,
      backgroundColor:"#C94924",
      borderRadius:8
    },
    buttonCurric:{
      padding:10,
      backgroundColor:"#0F0DE8",
      borderRadius:8,
      marginLeft:6
    },
  });
  export {ViewRequestStyle};