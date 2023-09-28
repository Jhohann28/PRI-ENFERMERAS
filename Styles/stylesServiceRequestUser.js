
import { StyleSheet } from "react-native"

const stylesServiceRequestUser = StyleSheet.create({
    container: {
        backgroundColor: "#487EA5",
        flex: 1,
    },
    container2: {
        backgroundColor:"#0B2B42",
        borderRadius: 5,
        height: 200
    },
    container3: {
        backgroundColor: "#0B2B42",
        marginTop: 25,
        width: 370,
        marginLeft: 20,
        borderRadius: 10,
        height: 450
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
        fontSize: 22,
        textAlign: 'center',
         
    },
    btnSolicitar: {
        color: "ffffff",
        backgroundColor: "#0B3068",
        height: 60,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 92,
        borderRadius: 10,
        marginTop: 25,
    },
    btnTexto: {
        color: "#ffffff",
        fontSize: 18,
    },
    combo: {
        color: "#ffffff",
        backgroundColor: "#5E88D8",
        
        marginTop: 25,
        width: 318,
        marginLeft: 25,
        justifyContent: "center",
        textAlignVertical: 'top',
    },
    inputDescriptionService: {
        backgroundColor: "#FFFFFF",
        width: 318,
        marginLeft: 25,
        marginTop: 25,
        borderRadius: 15,
        height: 250,
        textAlign: 'left',
        padding: 10,       
        textAlignVertical: 'top',
        padding: 20,      
    },
    

    //----------------------------ESTILO PARA CARGAR IMAGEN----------------------------------

    containerLoadImage:{
        
        height: 300,
        width: 318,
        marginLeft: 25,
    },
    btnLoad: {
        marginTop: 25,
        width: 200,
        height: 30,
        backgroundColor: 'green',
        marginLeft: 90,
        borderRadius: 5,
        marginBottom: 25

        

    },
    btnTextLoad: {
        color: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 5,
        
    },
    imageLoad:{
        marginTop: 25,
        width: 320, 
        height: 200,
        borderRadius: 5,
        marginLeft: 25
        
        
    },

    //--------------------------ESTILOS PARA LAS VALIDACIONES DE ENVIO DE SERVICIO PARA ATENCION DEL CLIENTE\\

    errorText: {
        backgroundColor: 'red',
        color: '#ffffff',
        width: 318,
        marginLeft: 25,
        borderRadius: 5,
        height: 30,
        textAlign: 'center',
        padding: 3
    }

});

export { stylesServiceRequestUser };