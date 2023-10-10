import { StyleSheet } from "react-native"

const stylesAdmin = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: "#C3D0D9",

    },
    container2: {
        backgroundColor: "#002f5C",
        height: 310,
        borderRadius: 25,
   

    },
    container22: {
        backgroundColor: "#002f5C",
        height: 310,
        borderRadius: 25,
   

    },
    container3: {
        backgroundColor: "#315488",
        marginTop: -70,
        width: "90%",
        borderRadius: 25,
       height:"65%",
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",

    }, container33: {
        backgroundColor: "white",
        marginTop: -70,
        width: "90%",
        borderRadius: 25,
       height:"65%",
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",

    },
    container4: {
        backgroundColor: "#FFFFFF",
        width: "90%",
        alignSelf:"center",
        borderRadius: 25,

    },
    image: {
        position: 'absolute',
        top: 5,
        right:15, 
        width: 100, 
        height: 100, 
        height: 75,
        width: 75,
        borderRadius: 37.5,
    },
    texto: {
        color: "#FFFFFF",
        fontSize: 18,
        marginTop: 35,
        marginLeft: 35,
        fontStyle: 'italic',

    },

    texto1: {
        color: "#FFFFFF",
        fontSize: 25,
        marginTop: 15,
        marginLeft: 35,
        fontStyle: 'italic',
        fontWeight: '900'
    },
    btnJobApplications: {
        backgroundColor: "#B4B6F1",
        width: 95,
        height: 90,
        marginTop: 29,
        marginLeft: 10,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',
        
    },
    btnAttentionRequest: {
        backgroundColor: "#B4B6F1",
        width: 95,
        height: 90,
        marginTop: -90,
        marginLeft: 110,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',


    },
    btnAttentions:{
        backgroundColor: "#B4B6F1",
        width: 95,
        height: 90,
        marginTop: -90,
        marginLeft: 210,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',


    },
    btnHome:{
        backgroundColor: "#B4B6F1",
        width: 95,
        height: 90,
        marginTop: -90,
        marginLeft: 310,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',

    },
    btnIcons: {
        marginBottom: 15,

    },
  
   
    btnText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    textCorporationTitle: {
        color: "#000000",
        fontSize: 18,
        marginTop: 15,
        fontStyle: 'italic',
        fontWeight: 'bold',
        alignSelf:"flex-start"


    },
    textCorporation: {
        color: "#000000",
        fontSize: 18,
        marginTop: 15,
        marginLeft: 35,
        fontStyle: 'italic',
        paddingBottom: 20,
    },
    btnButton1: {

        backgroundColor: "#B4B6F1",
        width: 120,
        height: 120,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',
        margin:20
    },
    btnButton2: {
        backgroundColor: "#B4B6F1",
        width: 120,
        height: 120,
        margin:20,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',
        
    },
    btnButton3: {
        backgroundColor: "#B4B6F1",
        width: 120,
        height: 120,
        margin:20,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',
        
    },
    btnButton4: {
        backgroundColor: "#B4B6F1",
        width: 120,
        height: 120,
        margin:20,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',   
    },

    mySearcher:{
            borderBottomWidth:4,
            borderBottomColor:"#007aa2",
            margin:5,
            width:"60%",
            alignSelf:"flex-start",
            fontSize:17
    }
,
    //----------------------------------------------RENUNCIA---------------------------------------------\\

    container5: {
        backgroundColor: '#6C98DB',
        height: 'auto',
        width: 350,
        borderRadius: 25,
        marginLeft: 15,
        marginTop: 25,

    },

    btnReturn: {
        backgroundColor: '#315488',
        height: 35,       
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    btnTextReturn:{
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    textName: {
        fontStyle: 'italic',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 15,
    },
    textReason: {
        fontStyle: 'italic',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 8,
        marginLeft: 15,
    },
    btnContact: {
        backgroundColor: '#56D782',
        borderRadius: 10,
        width: 100,
        marginTop: 20,
        marginLeft: 15,
        marginBottom: 10,
        height: 35,
        justifyContent: 'center',
    },
    btnTextReason: {
       
        textAlign: 'center',
        color: "#ffffff",
        fontWeight: 'bold',


    },
    btnUnsubscribe: {
        backgroundColor: '#053E93',
        borderRadius: 10,
        width: 100,
        marginLeft: 125,
        marginTop: -42,
        marginBottom: 10,
        height: 35,
        justifyContent: 'center'
    },
    btnDecline: {
        backgroundColor: '#D75656',
        borderRadius: 10,
        width: 100,
        marginLeft: 235,
        marginTop: -45,
        marginBottom: 10,
        height: 35,
        justifyContent: 'center',
    },

    //-------------------------------------SERVICIOS--------------------------------------\\
    container6: {
        backgroundColor: '#6C98DB',
        height: 'auto',
        width: "95%",
        borderRadius: 25,
        margin:10,
        alignSelf:"center"
        

    },
    btnReturn2: {
    
        backgroundColor: '#315488',
        height: 35,       
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: 100,
    },
    btnAddServices: {
        backgroundColor: '#315488',
        justifyContent: "flex-end",
        borderRadius: 50,
        width: 60,
        alignItems: "flex-end",
        margin:3,
        alignSelf:"flex-end"

    },
    textNameServices: {
        fontStyle: 'italic',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 15,
        color: '#ffffff'
    },
    textPriceServices: {
        fontStyle: 'italic',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 280,
        marginTop: -25,
        color: '#ffffff'
        
    },
    textTypeOfService: {
        fontStyle: 'italic',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 8,
        marginLeft: 40,
        marginRight: 40,
        color: '#ffffff'
    },
    btnDelete: {
        backgroundColor: '#D75656',
        borderRadius: 10,
        width: 150,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 10,
        height: 35,
        justifyContent: 'center',
    },
    btnTextOptions: {
       
        textAlign: 'center',
        color: "#ffffff",
        fontWeight: 'bold',


    },
    btnEdit: {
        backgroundColor: '#56D782',
        borderRadius: 10,
        width: 150,
        marginLeft: 180,
        marginTop: -45,
        marginBottom: 10,
        height: 35,
        justifyContent: 'center',
    },

    //------------------MODAL ALERT STYLE-------------------\\

    container7: {
        backgroundColor: '#ffffff',
        width: 350,
        height: 178,
        marginLeft: 30,
        marginTop: 404,
        borderRadius: 25,
        
        
    },
    textMessage: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    btnCancel:{
        backgroundColor: '#000000',
        marginTop: 40,
        height: 35,
        width: 130,
        marginLeft: 20,
        borderRadius: 10
        
    },
    textCancel:{
        color: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        fontWeight: '800',

    },
    btnAccept: {
        backgroundColor: '#000000',
        height: 35,
        width: 130,
        marginLeft: 180,
        marginTop: -36,
        borderRadius: 10
        
    },
    textAccept:{
        color: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 6,
        fontWeight: '800',
    },
    MyModal:{
        backgroundColor:"#e0e0e0",
        width:"85%",
        alignSelf:"center",
        alignItems:"center",
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 8,
        padding:10,
        borderRadius:10,
        marginTop:269



    },

    myBtnModalCancel:{
        borderRadius:11,
        backgroundColor: "#73C883",
        padding:6,
        margin:6,
        width:"45%"
        
        
    },
    myBtnModalAccept:{
        borderRadius:11,
        backgroundColor: "red",
        padding:6,
        margin:6,
        width:"45%"
    }
    ,myTextModal:{

    },
    myTextInput:{
        color : "white",
        margin : 10,
        fontSize: 20,
        fontWeight:"bold"
    },
    myTextInputReal:{
        color : "white",
        margin : 10,
        fontSize: 20,
        borderBottomWidth:3,
        borderBottomColor:"white",
        width:"80%"
        ,padding:5
        
    }

   
});

export { stylesAdmin };