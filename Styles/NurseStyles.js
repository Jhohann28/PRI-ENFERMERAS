import { StyleSheet } from "react-native"

const stylesNurse = StyleSheet.create({


    container: {
        backgroundColor: "#E7E7E7",
        flex: 1,
        

    },
    container2: {        
        backgroundColor: "#98C7BE",
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        height: 235,
        

    },
    image: {
        position: 'absolute',
        top: 25, // Alinea la imagen en la parte superior
        right:15, // Alinea la imagen en la parte derecha
        width: 100, // Ajusta el ancho de la imagen según sea necesario
        height: 100, // Ajusta la altura de la imagen según sea necesario
        height: 75,
        width: 75,
        borderRadius: 37.5,
    },
    texto: {
        color: "#000000",
        fontSize: 18,
        marginTop: 35,
        marginLeft: 35,
        fontStyle: 'italic',

    },

    texto1: {
        color: "#000000",
        fontSize: 25,
        marginTop: 15,
        marginLeft: 35,
        fontStyle: 'italic',
        fontWeight: '900'
    },
    inputSearch: {
        backgroundColor: "#FFFFFF",
        width: 350,
        marginLeft: 35,
        marginTop: 30,
        borderRadius: 15,
        height: 45,
        textAlign: 'left',
        padding: 10,
    },
    iconSearch: {
        position: 'absolute',
        top: 140,
        left: 340,

    },
    texto2: {
        color: "#000000",
        fontSize: 18,
        marginTop: 15,
        marginLeft: 15,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    texto3: {
        color: "#000000",
        fontSize: 18,
        marginTop: -25,
        marginLeft: 300,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    MessageText: {
        color: "#000000",
        fontSize: 20,
        marginTop: 55,
        marginBottom:10,
        marginLeft: 120,
        fontStyle: 'italic',
        fontWeight: '900'


    },
    MessageText2: {
        color: "#000000",
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20,
        fontStyle: 'italic',
        fontWeight: '900'


    },
    containerHorizontal:
    {
        flexDirection:"row"
        ,
        marginTop:3
    },
    containerHorizontal2:
    {
      width:"87%",
    },
    myAtentionRequestItem:{
        backgroundColor: "white",
        width:"93%",
        alignSelf:"center",
        borderRadius:15,
        padding:5,
        marginVertical:10
    },
    myScroll:{
        width:"100%"
    },
    left:{
        alignSelf:"flex-start",
        fontSize:17,
        fontWeight:"bold"
    },
    right:{
        marginLeft:"auto",
        fontWeight:"bold",
        color:"green",
        fontSize:16
    },
    right2:{
        marginLeft:"auto",
        fontWeight:"bold",
        color:"#e2ba1f",
        fontSize:16
    },
    btnAccept:{
        backgroundColor:"#56D782",
        padding:5,
        borderRadius:8,
        marginHorizontal:10,
       width:"40%"

    },
    btnRemove:{
        backgroundColor:"red",
        padding:5,
        borderRadius:8,
        marginHorizontal:10,
       width:"40%"

      
    },
    containerHorizontalButtons:{
        flexDirection:"row",
        marginTop:5,
        alignItems:"center",
        justifyContent:"center"

    }
});

export { stylesNurse };