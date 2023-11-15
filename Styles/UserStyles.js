import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#487EA5",
        flex: 1,
    },
    container2: {
        backgroundColor:"#0B2B42",
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
        margin: 35,
    },
    worldBlue: {
        resizeMode: 'contain',
        width: 420, // Ajusta el ancho según lo deseado
        height: 500, // Ajusta la altura según lo deseado
        marginTop: -40,  
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
        marginTop: -20,
    },
    btnTexto: {
        color: "#ffffff",
        fontSize: 18,

    },
    //------HISTORIAL DE ATENCION
    search: {

        backgroundColor: "#FFFFFF",
        width: 350,
        marginLeft: 35,
        marginTop: -20,
        borderRadius: 10,
        height: 45,
        textAlign: 'left',
        padding: 10,
        marginBottom: 22
    },
    iconSearchs: {
        position: 'absolute',
        top: 150,
        left: 340,
    },
    //----------------------------ESTILO PARA LA VENTANA DE AMPLIAR------------------------
    btnReload: {
        alignSelf: 'center', 
        borderRadius: 10, 
        padding: 10, 
        width: '85%', 
        textAlign: "center", 
        backgroundColor: '#0B3068',
        color: '#ffffff',
        marginBottom: 20
        
    },
    textReload: {
        color: '#ffffff',
        textAlign: 'center'
    },
    scrollDetail: {
 
        
        marginTop: 35,
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 50,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 25
        
    },
    textScroll: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    imgRef: {
        height: 300,
        width: 300,
        backgroundColor: 'red',
        borderRadius: 10,
        marginBottom: 50
    }
   
});

export { styles };

