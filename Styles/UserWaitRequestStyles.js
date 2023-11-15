import { StyleSheet } from "react-native"

const ServiceWaitRequestUserStyle = StyleSheet.create({

    container: {
        backgroundColor: "#487EA5",
        flex: 1,
    },
    container2: {
        backgroundColor:"#0B2B42",
        borderRadius: 5,
        height: 150
    },
    container3: {
        backgroundColor: "#0B2B42",
        marginTop: 25,
        width: 370,
        marginLeft: 20,
        borderRadius: 10,
        height: 580
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
        color: "#ffffff",
        fontSize: 18,
        marginTop: 35,
        marginLeft: 35,

    },

    texto1: {
        color: "#ffffff",
        fontSize: 25,
        marginTop: 15,
        marginLeft: 35,
    },
    texto2: {
        color: "#ffffff",
        fontSize: 15,
        marginTop: 15,
        marginLeft: 20,
        textAlign: 'center',
        
        width: 330
    },

    btnCancelarSolicitud:{
        color: "ffffff",
        backgroundColor: "#D75656",
        height: 60,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 60,
        borderRadius: 5,
        marginTop: 160,
    },
    btnTexto: {
        color: "#ffffff",
        fontSize: 15,
    },
    loadIndicator: {
        width: 100,
        padding: 25,      
        marginBottom: -50,
        marginTop:100,
        marginLeft: 140,
        

    }
});

export { ServiceWaitRequestUserStyle };
