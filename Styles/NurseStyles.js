import { StyleSheet } from "react-native"

const stylesNurse = StyleSheet.create({


    //-------------------------HOME DE LA ENFERMERA------------------------\\
    container: {
        backgroundColor: "#E7E7E7",
        flex: 1,
    },
    container2: {        
        backgroundColor: "#98C7BE",
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        height: 320,
       
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
        marginTop: 50,
        borderRadius: 15,
        height: 45,
        textAlign: 'left',
        padding: 10,
    },
    iconSearch: {
        position: 'absolute',
        top: 170,
        left: 340,

    },
    texto2: {
        color: "#000000",
        fontSize: 18,
        marginTop: 35,
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
        marginTop: 225,
        marginLeft: 120,
        fontStyle: 'italic',
        fontWeight: '900'


    },
    //-------------------------RENUNCIA DE LA ENFERMERA-----------------------------\\


    container3: {
        backgroundColor: "#E7E7E7",
        flex: 1,
    },
    container4: {
        backgroundColor: "#98C7BE",
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        height: 150,
        
    },
    container5: {
        backgroundColor: "#98C7BE",
        borderRadius: 25,
        height: 550,
        width: 380,
        marginTop: 35,
        marginLeft: 15
    },
    textTitle: {
        color: "#000000",
        fontSize: 20,
        marginTop: 15,      
        fontStyle: 'italic',
        fontWeight: '900',
        textAlign: 'center'
    },
    textReaseonResignation:{
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 25,
        marginTop: 25

    },
    inputReasonResignation: {
        backgroundColor: "#FFFFFF",
        width: 350,
        marginLeft: 14,
        marginTop: 10,
        borderRadius: 15,
        height: 350,
        textAlign: 'left',
        padding: 10,       
        textAlignVertical: 'top',
        padding: 20,      
    },
    inputNameResignation: {
        backgroundColor: "#FFFFFF",
        width: 350,
        marginLeft: 14,
        marginTop: 10,
        borderRadius: 15,
        height: 60,
        textAlign: 'left',
        padding: 10,       
        textAlignVertical: 'top',
        padding: 20,      
    },
    btnRequest: {
        backgroundColor: '#D75656',
        borderRadius: 10,
        width: 220,
        marginLeft: 80,
        marginTop: 35,
        marginBottom: 10,
        height: 45,
        justifyContent: 'center',
    },
    btnTextRequest: {
        textAlign: 'center',
        color: "#ffffff",
        fontWeight: 'bold',
    }

});

export { stylesNurse };