import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import { ViewRequestStyle } from '../../Styles/ViewRequestStyle';
import soli from "../../assets/images/Windows/solicitud.png";

const App = () => {

  const [solicitud, setSolicitud] = useState(null);

  useEffect(() => {
    // DEBE RECIBIR EL ID DE LA SOLICITUD DE LA OTRA VENTANA POR EL BOTON AMPLIAR
    const { solicitudId } = route.params;

    const solicitudRef = doc(db, 'JobRequest', solicitudId);

    getDoc(solicitudRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const solicitudData = docSnapshot.data();
          setSolicitud(solicitudData);
        } else {
          console.log('La solicitud no existe');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la solicitud:', error);
      });
  }, []);

  const handleDescargarPDF = () => {
    if (solicitud && solicitud.curriculumUrl) {
      Linking.openURL(solicitud.curriculumUrl);
    } else {
      console.log('No se ha proporcionado una URL de curriculum válida');
    }
  };

  if (!solicitud) {
    return <Text>Cargando...</Text>;
  }


  return (

    <View style={ViewRequestStyle.container}>

      <View style={ViewRequestStyle.container2}>
        <Text style={ViewRequestStyle.title}>Solicitud de Trabajo </Text>
        <Image source={require(soli)} style={ViewRequestStyle.icon}/>

      </View>
      
      

      <View style={ViewRequestStyle.card}>

      <Text style={ViewRequestStyle.name}> {solicitud.names}</Text>
      <Text style={ViewRequestStyle.especialidad}>Especialidad:{solicitud.speciality}</Text>
      <Text style={ViewRequestStyle.telefono}>Nro. Telefono: {solicitud.phone}</Text>

      <Text style={ViewRequestStyle.experience}>Fecha de Titulacion: {solicitud.titulationDate}</Text>
      <Text style={ViewRequestStyle.experience}>Instituto:{solicitud.graduationInstitution} </Text>
      <View style={ViewRequestStyle.pdf}>

          <Text style={ViewRequestStyle.curriculum}>Curriculum adjunto: 
          
          </Text>
          <TouchableOpacity style={ViewRequestStyle.buttonCurric} onPress={handleDescargarPDF}>
                  <Text style={ViewRequestStyle.textButton}>Ver PDF curriculum</Text>
          </TouchableOpacity>
      </View>
      

    </View>

      <View style={ViewRequestStyle.buttons}>

      <TouchableOpacity style={ViewRequestStyle.button}>
              <Text style={ViewRequestStyle.textButton}>CONTACTAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ViewRequestStyle.buttonAceptar}>
              <Text style={ViewRequestStyle.textButton}>ACEPTAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ViewRequestStyle.buttonRechazar}>
              <Text style={ViewRequestStyle.textButton}>RECHAZAR</Text>
      </TouchableOpacity>

      </View>

    </View>

  );
}; export default App;