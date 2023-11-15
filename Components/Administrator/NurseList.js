import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView, FlatList, Linking, Modal, ActivityIndicator, TextInput } from 'react-native';
import { stylesAdmin } from '../../Styles/AdminStyles.js';
import profile from '../../assets/images/GeneralImages/perfil.jpg';
import logo from '../../assets/images/GeneralImages/logo.png'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ServicesList from './ListofServices.js';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesNurse } from '../../Styles/NurseStyles.js';
import ListNurseData from '../../Data/LisNurseData.js';
const NurseList = () => {
    const [searchInput, setSearchInput] = useState("");
    const [myuser, setuser] = useState("");
    var muser = "";

    const [nurses, setNurses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentID, setCurrentID] = useState(null);
    const [fileName, setCurrentName] = useState(null);

    const [load, setLoad] = useState(true);

    const getLocalUser = async () => {

        try {
            muser = await AsyncStorage.getItem("user");
            let muserJson = muser ? JSON.parse(muser) : null;
            setuser(muserJson);
        }
        catch (e) {
            console.error(e);
            setuser("");
        }
    }

    useEffect(() => {
        getLocalUser();
    }, [])

    useEffect(() => {
        mgetNurses();

    }, [load]);
    var myNurses = [];
    let mgetNurses = async () => {
        let h = new ListNurseData();
        myNurses = await h.getNurses();
        console.log(myNurses);
        setNurses(myNurses);
        console.log(nurses.length);

    }

    let contactNurse = async (phone) => {


        await Linking.openURL("tel:" + phone);
    }


    let closeSession = async () => {

        AsyncStorage.clear();
        n.replace("StartPage");
    }

    const handleLinkPress = (url) => {

        Linking.openURL(url).catch((err) => console.error('Error al abrir el enlace:', err));

    };


    const deleteNurse = async () => {
        try {
            setLoading(true);
            let dt = new ListNurseData();
            let r = await dt.DeleteRequest(currentID, fileName);
            console.log("r", r);
            if (dt.isAllOk) {
                setModalVisible(false);
                Alert.alert("Éxito", "Se dió de baja a la enfermera");
                setLoad(!load);
                setLoading(false);
            }
            else {
                setModalVisible(false);
                console.log("else");
                setLoading(false);
                Alert.alert("Error", "No se dió de baja a la enfermera");

            }
        } catch (error) {
            setModalVisible(false);

            setLoading(false);
            Alert.alert("Error", "No se dió de baja a la enfermera");

        }

    }

    return (


        <View style={stylesAdmin.container}>
            <View style={stylesAdmin.container2}>
                <Text style={stylesAdmin.texto}>Lista de Enfermeras</Text>
                <Text style={stylesAdmin.texto1}>{myuser != "" ? myuser.personRef.names : ""}</Text>
                <Ionicons name="ios-person-circle-outline" size={74} color="white" style={stylesAdmin.image} />
                <View style={stylesAdmin.container4}>
                    <Text style={stylesAdmin.textCorporationTitle}>SISEEM</Text>
                    <Text style={stylesAdmin.textCorporation}>Servicios de vida al 100%</Text>
                    <Image
                        source={logo}
                        style={stylesAdmin.image}
                    />
                </View>
            </View>


            <Modal
                style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={stylesAdmin.MyModal} >
                    <View>
                        <Text style={{ fontSize: 20, textAlign: "center", }}>¿Estás seguro de dar de baja a la Enfermera?</Text>
                        {loading ? <ActivityIndicator size="large" color="#064571" />

                            : <View style={stylesNurse.containerHorizontal}>

                                <TouchableOpacity

                                    onPress={() => setModalVisible(!modalVisible)} style={stylesAdmin.myBtnModalCancel}>
                                    <Text style={{ textAlign: "center", fontSize: 22 }} >Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={stylesAdmin.myBtnModalAccept}

                                    onPress={async () => { await deleteNurse(); }}>
                                    <Text style={{ textAlign: "center", fontSize: 22, color: "white" }} >Confirmar</Text>
                                </TouchableOpacity>
                            </View>

                        }
                    </View>

                </View>
            </Modal>

            <View style={stylesAdmin.container3}>
                <TextInput
                    style={stylesAdmin.search}
                    placeholder='Buscar'
                    onChangeText={(text) => setSearchInput(text)}
                    value={searchInput}
                >
                </TextInput>
                <Ionicons name="search" size={30} color="black" style={stylesAdmin.iconSearchs} />
                <ScrollView style={stylesNurse.myScroll}>
                    {nurses.length > 0 ? nurses.map((item) => {

                        if (searchInput != "") {
                            if (!item.names.includes(searchInput)) {
                                return;
                            }
                        }
                        return (
                            <View style={stylesNurse.myAtentionRequestItem} key={item.id}  >
                                <View style={stylesNurse.containerHorizontal}
                                >
                                    <FontAwesome5 name="user-nurse" size={44} color="black" />
                                    <View></View>
                                    <View style={stylesNurse.containerHorizontal2}
                                    >

                                        <Text style={stylesNurse.left} >Nombre:<Text style={{ fontWeight: "normal" }} > {item.names + " " + item.lastName} </Text> </Text>
                                        <Text style={stylesNurse.left}>CI: <Text style={{ fontWeight: "normal" }} > {item.ci}</Text></Text>



                                        <View style={stylesNurse.containerHorizontal3}
                                        >
                                            <Text style={stylesNurse.left} >{item.phone}<Text style={{ fontWeight: "normal" }} ></Text> | </Text>
                                            <Text style={stylesNurse.left}>{item.email}<Text style={{ fontWeight: "normal" }} ></Text> </Text>


                                        </View>

                                        <View style={stylesNurse.containerHorizontal3}
                                        >
                                            <Text style={stylesNurse.left}>Institución de egreso: <Text style={{ fontWeight: "normal" }} >  {item.graduationInstitution}</Text> </Text>

                                        </View>
                                        <Text style={stylesNurse.left}>Fecha Egreso: <Text style={{ fontWeight: "normal" }} > {item.titulationDate} </Text></Text>

                                        <Text style={stylesNurse.left}>Especialidad: <Text style={{ fontWeight: "normal" }} > {item.speciality}</Text></Text>
                                        <View style={stylesNurse.containerHorizontal3}
                                        >
                                            <Text style={stylesNurse.left} >N° Atenciones:<Text style={{ fontWeight: "normal" }} > {item.quantityAtentions}</Text>  </Text>
                                        </View>
                                        <Text style={stylesNurse.left}>Recaudado Bs:<Text style={{ fontWeight: "normal" }} > {item.amount}</Text> </Text>

                                        <TouchableOpacity onPress={() => handleLinkPress(item.curriculum.curriculumUrl)}><Text style={{ color: "blue", alignSelf: "center", margin: 4 }}>Ver Curriculum <Text style={{ fontWeight: "normal" }} ></Text></Text></TouchableOpacity>

                                        <View style={stylesNurse.containerHorizontalButtons}>
                                            <TouchableOpacity style={stylesNurse.btnAccept} onPress={() => { contactNurse(item.phone) }}>
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 15 }}>Contactar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={stylesNurse.btnRemove} onPress={() => { setCurrentID(item.id); setCurrentName(item.curriculum.curriculumName); setModalVisible(true); }}>
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 15, color: "white" }}  >Dar de Baja</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={stylesNurse.containerHorizontalButtons}>

                                </View>
                            </View>
                        )
                    })
                        :
                        <Text style={{ color: "white", fontSize: 17, alignSelf: "center" }}>No hay enfermeras en el sistema</Text>
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default NurseList;