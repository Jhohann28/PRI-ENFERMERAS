import { StyleSheet } from "react-native"

const profileStyle = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#121b22'
        //121b22
    },
    container2:{
        marginTop: 15,
        
        width: '95%',
        marginLeft: 10
    },
    iconProfile: {
        marginLeft: 125,
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    textHeader: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    line: {
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 20,
        
    },
    line2: {
        color: '#ffffff',
        marginLeft: 50,
        marginTop: 10,
        opacity: 0.5
    },
    container3: {
     
        width: '95%',
        marginLeft: 10,
        marginTop: 10,

    },
    container4:{     
        width: '100%',
        height: 86,    
      
       
    },
    iconLeft: {
       marginTop: 25,
       marginLeft: 13
    },
    iconRight: {
        position: 'absolute',
        right:20,
        top: 9
        
    },
    textTitle: {
        color: '#ffffff',
        fontSize: 12,
        marginLeft: 55,
        marginTop: -39,
        opacity: 0.5
    },
    textDescription: {
        color: '#ffffff',
        fontSize: 17,
        marginLeft: 55,
        marginTop: 10, 
        width: '73%'
    },
    
    btnChangePassword: {
        
        width: '8%',
        height: 35,
        marginLeft: 345,
        marginTop: -45
    },
    //----------------------------VENTANA MODAL DE CAMBIO DE CONTRASEñA
    container7: {
        backgroundColor: '#ffffff',
        width: 350,
        height: 310,
        marginLeft: 30,
        marginTop: 260,
        borderRadius: 25,
        
        
    },
    textMessage: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10
    },
    btnCancel:{
        backgroundColor: '#121b22',
        marginTop: 20,
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
        backgroundColor: '#121b22',
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
    textPasswordAfter: {
        width: '90%',
        borderRadius: 10,
        marginLeft: 16,
        marginTop: 45,
        height: 40,
        borderBottomWidth: 2,
        borderWidth: 1, 
        borderBottomColor: 'black', 
        textAlign: 'center'
    },
    textChangePassword: {
        width: '90%',
        borderRadius: 10,
        marginLeft: 16,
        marginTop: 15,
        height: 40,
        borderBottomWidth: 2,
        borderWidth: 1, 
        borderBottomColor: 'black', 
        textAlign: 'center'
    },
    textConfirmationPassword: {
        width: '90%',
        borderRadius: 10,
        marginLeft: 16,
        marginTop: 15,
        height: 40,
        borderBottomWidth: 2,
        borderWidth: 1, 
        borderBottomColor: 'black', 
        textAlign: 'center'
    },
    btnSaveChanges:{
        backgroundColor: '#03a984',
        width: "70%",
        height: 40,
        marginLeft: 40,
        marginTop: 40,
        borderRadius: 10,
        marginBottom: 30,
        alignSelf:"center"
    },
    textSaveChanges: {
        color: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 8
    },
    scrollViewContainer:{
        
        height: 480,
       
    },

    //validaciones

    textError:{
        color: 'red',
        marginLeft: 55
    },

    //-----------ESTILO PARA CAMBIO DE CONTRASEñA--------
    container8: {
        backgroundColor: '#ffffff',
        width: 350,
        height: 450,
        marginLeft: 30,
        marginTop: 260,
        borderRadius: 25,
        
        
    },


});

export { profileStyle };