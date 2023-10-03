import { StyleSheet } from "react-native";

const CreateStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B98C3',
    padding: 20,
  },
  container2:{
    flexDirection:'row',
    marginBottom:20
  },
  textHead:{
    color:'#fff',
    fontSize:20
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
    width:"100%",
    alignItems:'center'
  },
  inputD:{
    borderWidth: 1,

    borderColor: '#A9A9A9',

    borderRadius: 5,

    padding: 10,

    marginBottom: 19,
    color:'#FDFEFE'
    
    
  },
  icon:{
    marginTop:30,
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
  
  });
  export {CreateStyles};