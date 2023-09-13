import { StyleSheet } from "react-native"

const stylesAdmin = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: "#C3D0D9",

    },
    container2: {
        backgroundColor: "#4958DC",
        height: 310,
        borderRadius: 25,
   

    },
    container3: {
        backgroundColor: "#315488",
        marginTop: 50,
        width: 380,
        borderRadius: 25,
        marginLeft: 15,
        height: 420,

    },
    container4: {
        backgroundColor: "#FFFFFF",
        marginTop: -155,
        width: 380,
        borderRadius: 25,
        marginLeft: 15,

    },
    image: {
        position: 'absolute',
        top: 25,
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
        marginTop: 25,
        marginLeft: 35,
        fontStyle: 'italic',
        fontWeight: 'bold',


    },
    textCorporation: {
        color: "#000000",
        fontSize: 18,
        marginTop: 25,
        marginLeft: 35,
        fontStyle: 'italic',
        paddingBottom: 20,
    },
    btnButton1: {

        backgroundColor: "#B4B6F1",
        width: 120,
        height: 120,
        marginTop:110,
        marginLeft: 45,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
    btnButton2: {
        backgroundColor: "#B4B6F1",
        width: 120,
        height: 120,
        marginTop:30,
        marginLeft: 45,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',
        
    },
    btnButton3: {
        backgroundColor: "#B4B6F1",
        width: 120,
        height: 120,
        marginTop:-268,
        marginLeft: 225,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',
        
    },
    btnButton4: {
        backgroundColor: "#B4B6F1",
        width: 120,
        height: 120,
        marginTop:30,
        marginLeft: 225,
        borderRadius: 25,
        justifyContent: 'flex-end', 
        alignItems: 'center',   
    },



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
        width: 350,
        borderRadius: 25,
        marginLeft: 15,
        marginTop: 25,
        

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
        height: 48,       
        justifyContent: 'center',
        borderRadius: 50,
        width: 60,
        marginLeft: 320,
        marginTop: -34,
        alignItems: 'center'

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
    
   
});

export { stylesAdmin };