import { StyleSheet } from "react-native"
const Passwstyles = StyleSheet.create({
  container: {
      flex:1,
      alignItems: 'center',
      backgroundColor:'rgba(0, 0, 0, 0.5)'
    },
    title:{
      color:"#fff",
      fontSize:30,
      textAlign:"center",
      marginTop:90,
      
    },
    textBack:{
      color:"#fff",
      textAlign:'left'
    },
    textBack2:{
      color:"#fff",
      textAlign:'left',
      marginBottom:20
    },
    input:{
      backgroundColor:"#fff",
      padding:10,
      color:"#17202A",
      fontSize:15,
      borderWidth:1,
      width:300,
      marginTop:20
      
    },
    button:{
      padding:15,
      backgroundColor:"#0F0DE8",
      borderRadius:8
    },
    textButton:{
      color:'#fff'
    },
    containerHead:{
      backgroundColor:"#064571",
      padding:39,
      borderBottomLeftRadius:40,
      borderBottomRightRadius:40,
      width:"100%"
    },
    backgroundImage: {
      flex:1,
      resizeMode: 'cover', // Ajusta la imagen al tamaño de la pantalla
     
    },
}); export {Passwstyles};