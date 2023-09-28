import { StyleSheet } from "react-native"

const UserMapStyle = StyleSheet.create({

    container: {
        backgroundColor: "#487EA5",
        flex: 1,
    },
    container2: {
        backgroundColor:"#0B2B42",
        borderRadius: 5,
        height: 130,
        marginTop: 15,
        width: 380,
        marginLeft: 15,
    },
    container3: {
        backgroundColor:"#0B2B42",
        borderRadius: 5,
        height: 600,
        width: 380,
        marginLeft: 15,
        marginTop: 20
    },
    textTitleInfo: {
        color: '#ffffff',
        fontSize: 20,
        marginTop: 5,
        marginLeft: 10,
        width: 125
    },
    textInfo: {
        color: '#ffffff',
        fontSize: 13,
        marginTop: 15,
        marginLeft: 22,
        width: 355,
        

    },
    map: {
        width: '100%',
        height: '100%',
        
    }

});

export { UserMapStyle };