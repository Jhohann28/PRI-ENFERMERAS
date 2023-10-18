import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';


const ReportScreen = () => {
  // Datos de ejemplo para los gráficos
  const servicesData = {
    labels: ['Servicio A', 'Servicio B', 'Servicio C'],
    datasets: [
      {
        data: [100, 90,120], // Cantidad de servicios requeridos (ficticios)
      },
    ],
  };

  const nursesData = {
    labels: ['Enfermera 1', 'Enfermera 2', 'Enfermera 3'],
    datasets: [
      {
        data: [90, 110, 80], // Recaudación por enfermera (ficticia)
      },
    ],
  };

  const clientsPaidData = {
    labels: ['Cliente A', 'Cliente B', 'Cliente C'],
    datasets: [
      {
        data: [150, 120, 100], // Monto pagado por cada cliente (ficticio)
      },
    ],
  };

  const clientsAttendedData = {
    labels: ['Cliente A', 'Cliente B', 'Cliente C'],
    datasets: [
      {
        data: [10, 7, 3], // Número de atenciones recibidas por cada cliente (ficticio)
      },
    ],
  };

  const nurseAttentionsData = {
    labels: ['Enfermera 1', 'Enfermera 2', 'Enfermera 3'],
    datasets: [
      {
        data: [15, 20, 12], // Número de atenciones realizadas por cada enfermera (ficticio)
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Reportes en General</Text>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Servicios más requeridos</Text>
          <BarChart
            data={servicesData}
            width={300}
            height={200}
            yAxisLabel="Cantidad"
            chartConfig={chartConfig}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Enfermeras con más recaudación</Text>
          <BarChart
            data={nursesData}
            width={300}
            height={200}
            yAxisLabel="Recaudación"
            chartConfig={chartConfig}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Clientes que más pagaron</Text>
          <BarChart
            data={clientsPaidData}
            width={300}
            height={200}
            yAxisLabel="Monto Pagado"
            chartConfig={chartConfig}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Clientes que más atenciones recibieron</Text>
          <BarChart
            data={clientsAttendedData}
            width={300}
            height={200}
            yAxisLabel="Número de Atenciones"
            chartConfig={chartConfig}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Enfermeras que más atenciones dieron</Text>
          <BarChart
            data={nurseAttentionsData}
            width={300}
            height={200}
            yAxisLabel="Número de Atenciones"
            chartConfig={chartConfig}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const chartConfig = {
    backgroundGradientFrom: '#e8f0ff',
    backgroundGradientTo: '#e8f0ff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    
  };

  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: '#326695',  // Cambia este color según tus preferencias
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
      backgroundColor:'#96B4FF',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    chartContainer: {
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
  });
  
  

export default ReportScreen;
