import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import DataReports from '../../Data/DataReports';
import { stylesNf } from '../../Styles/FormNurseStyles';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReportScreen = () => {
   

    const[laading, setLoading]= useState(false);



    const[nursesData, setNursesData] = useState(  {
      labels: [""],
      datasets: [
        {
          data: [""], 
        },
      ],
    })

  const [servicesData, setServiceData] = useState({
    labels: ['Servicio A'],
    datasets: [
      {
        data: [100], // Cantidad de servicios requeridos (ficticios)
      },
    ],
  });
  const [clientsPaidData, setClientsPaidData] = useState({
    labels: ['Cliente A'],
    datasets: [
      {
        data: [150],
      },
    ],
  });
  

  const [clientsAttendedData, setClientsAttendedData] = useState( {
    labels: ['Cliente A'],
    datasets: [
      {
        data: [10], 
      },
    ],
  });

  const [nurseAttentionsData, setNurseAttentionData] = useState({
    labels: ['Enfermera 1'],
    datasets: [
      {
        data: [15], 
      },
    ],
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [totalWon, setTotalWon] = useState("");
   
  const handleDateChange = async (event, date) => {     

    setShowDatePicker(false);     
    if (date !== undefined) {       
      setStartDate(date); 
     

    
      
    }  
   };  
   const handleDateChange2 = async (event, date) => {     

    setShowDatePicker2(false);     
    if (date !== undefined) {       
      setEndDate(date); 
     

    
      
    }  
   };  

   const getTotalWon= async()=>{
    let dt = new DataReports();
    let res = await dt.getTotalWonByDate(startDate, endDate);
    
    setTotalWon(""+res);
   }


  const mtd = async ()=>{
    setLoading(true);

    try {
      let dt = new DataReports();

      await dt.getReportNurses();
      await dt.getReportServices();
      await dt.getReportUsers();
  
  
  
      let nurseOrdered= await dt.nursesReportsList.sort((a, b) => b.totalWon - a.totalWon);
      let serviceOrdered= await dt.servicesReportsList.sort((a, b) => b.nAtentions - a.nAtentions)
      let clientOrdered= await dt.usersReportsList.sort((a, b) => b.totalWon - a.totalWon);
      let clientOrderedByCount= await dt.usersReportsList.sort((a, b) => b.nAtentions - a.nAtentions);
      let nurseOrderedByCount= await dt.nursesReportsList.sort((a, b) => b.nAtentions - a.nAtentions);



     
  
      console.log("Paso here -1");

       let nursesDataa = {
        labels: [nurseOrdered[0].names, nurseOrdered[1].names, nurseOrdered[2].names],
        datasets: [
          {
            data: [nurseOrdered[0].totalWon, nurseOrdered[1].totalWon, nurseOrdered[2].totalWon], // Recaudación por enfermera (ficticia)
          },
        ],
      };
      console.log("Paso here");
      let cdata2 = {
        labels: [clientOrderedByCount[0].names, clientOrderedByCount[1].names, clientOrderedByCount[2].names],
        datasets: [
          {
            data: [clientOrderedByCount[0].nAtentions, clientOrderedByCount[1].nAtentions, clientOrderedByCount[2].nAtentions], // Recaudación por enfermera (ficticia)
          },
        ],
      };
      console.log("Paso here2");

      let cpdata = {
        labels: [clientOrdered[0].names, clientOrdered[1].names, clientOrdered[2].names],
        datasets: [
          {
            data: [clientOrdered[0].totalWon, clientOrdered[1].totalWon, clientOrdered[2].totalWon], // Recaudación por enfermera (ficticia)
          },
        ],
      };


      let serviceDataa = {
        labels: [serviceOrdered[0].names, serviceOrdered[1].names, serviceOrdered[2].names],
        datasets: [
          {
            data: [serviceOrdered[0].nAtentions, serviceOrdered[1].nAtentions, serviceOrdered[2].nAtentions], // Recaudación por enfermera (ficticia)
          },
        ],
      };
      
      let nurseData2 = {
        labels: [nurseOrderedByCount[0].names, nurseOrderedByCount[1].names, nurseOrderedByCount[2].names],
        datasets: [
          {
            data: [nurseOrderedByCount[0].nAtentions, nurseOrderedByCount[1].nAtentions, nurseOrderedByCount[2].nAtentions], // Recaudación por enfermera (ficticia)
          },
        ],
      };
      
      setNursesData(nursesDataa);
      setServiceData(serviceDataa);
      setClientsPaidData(cpdata);
      setNurseAttentionData(nurseData2);
      setClientsAttendedData(cdata2);
  
    } catch (error) {
      console.log(error);
    }
   

    setLoading(false);


  }



  useEffect(()=>{
 mtd();
  },[])
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Reportes en General</Text>
       {laading?<ActivityIndicator size="large" color="white"></ActivityIndicator>:""} 

       
        <View style={styles.chartContainer}>
        <Text style={styles.title}>Servicios más requeridos</Text>
        <BarChart
          data={servicesData}
          width={350}
          height={300}
          
          chartConfig={chartConfig}
          showValuesOnTopOfBars={true}
        />
      </View>
      
       
         <View style={styles.chartContainer}>
          <Text style={styles.title}>Enfermeras con más recaudación Bs</Text>
          <BarChart
            data={nursesData}
            width={350}
            height={300}
            
            chartConfig={chartConfig}
            showValuesOnTopOfBars={true}
          />
        </View>

      
        <View style={styles.chartContainer}>
          <Text style={styles.title}>Clientes con mayor monto de pago Bs.</Text>
          <BarChart
            data={clientsPaidData}
            width={350}
            height={300}
            
            chartConfig={chartConfig}
            showValuesOnTopOfBars={true}
          />
        </View> 
       

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Clientes que más atenciones recibieron</Text>
          <BarChart
            data={clientsAttendedData}
            width={350}
            height={300}
            
            chartConfig={chartConfig}
            showValuesOnTopOfBars={true}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Enfermeras que más atenciones dieron</Text>
          <BarChart
            data={nurseAttentionsData}
            width={350}
            height={300}
            
            chartConfig={chartConfig}
            showValuesOnTopOfBars={true}
          />
        </View>
        <Text style={{color:"white", fontSize:18}}>Fecha de Inicio Ganancias: </Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={stylesNf.dateTimePicker}>
          <FontAwesome name="calendar" size={20} color="#333" style={stylesNf.calendarIcon} />
          <Text style={stylesNf.dateTimePickerText}>
            {startDate != null ? startDate.toLocaleDateString() : "Ingrese fecha de Ganancias"}
          </Text>
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={stylesNf.dateTimePicker}  // Estilo para DateTimePicker
        />
      )}
      <Text style={{color:"white", fontSize:18}}>Fecha de Fin Ganancias: </Text>
        <TouchableOpacity onPress={() => setShowDatePicker2(true)}>
        <View style={stylesNf.dateTimePicker}>
          <FontAwesome name="calendar" size={20} color="#333" style={stylesNf.calendarIcon} />
          <Text style={stylesNf.dateTimePickerText}>
            {startDate != null ? endDate.toLocaleDateString() : "Ingrese fecha de fin de Ganancias"}
          </Text>
        </View>
      </TouchableOpacity>

      {showDatePicker2 && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleDateChange2}
          style={stylesNf.dateTimePicker}  // Estilo para DateTimePicker
        />
      )}
        
        <TouchableOpacity onPress={()=>{getTotalWon()}} style={stylesNf.button} ><Text style={{color:"white", fontSize:18}}>Aceptar</Text></TouchableOpacity>
        <Text style={{color:"white", fontSize:22}}> {totalWon} Bs </Text>

      </View>
    </ScrollView>
  );
};

const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: '#e8f0ff',
    color: (opacity = 1) => `rgba(1, 72, 111, ${opacity})`
    
  };

  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: '#326695',  
    },
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 20,
      marginHorizontal: 20,
      borderRadius: 40,
      padding: 20,
      margin: 10,
      backgroundColor:'rgba(1, 72, 111, 1)',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color:"white"
    },
    chartContainer: {
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color:"white",
      marginTop: 10,

    },
  });
  
  

export default ReportScreen;
