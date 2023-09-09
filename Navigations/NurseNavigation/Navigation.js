import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import NurseHome from '../../Components/Nurse/NurseHome.js'
import NurseReportScreen from '../../ScreensPrueba/NurseReport.js'              
import NurseHistoryScreen from '../../ScreensPrueba/NurseHistory.js';           
import NurseResignationScreen from '../../ScreensPrueba/NurseResignation.js';   
import NurseProfileScreen from '../../ScreensPrueba/NurseProfile.js'; 

import { Entypo, Ionicons, FontAwesome5, EvilIcons, FontAwesome  } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator 
            initialRouteName='Home'        
            screenOptions={{
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#000000',
                tabBarActiveBackgroundColor: '#02D4A1',
                
                headerShown: false,
                tabBarStyle: {
                         
                   backgroundColor: '#ffffff',                 
                   height: 60,
                   borderColor: '#000000',
                   
                }
            }}
            >
            <Tab.Screen 
                name="Home" 
                component={NurseHome}
                options={{           
                            
                    tabBarIcon: ({ color, size}) => (
                        <Entypo name="home" size={30} color="black" />
                    ),
                }}
            
            />
            <Tab.Screen 
                name="Reportes" 
                component={NurseReportScreen} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <Ionicons name="documents" size={30} color="black" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Historral" 
                component={NurseHistoryScreen} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome5 name="grip-lines" size={30} color="black" /> 
                    ),
                }}
                 
            />
            <Tab.Screen 
                name="Renuncia" 
                component={NurseResignationScreen} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome5 name="envelope-open-text" size={30} color="black" />  
                    ),
                }}
            />
            <Tab.Screen 
                name="Perfil" 
                component={NurseProfileScreen} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome name="user" size={35} color="black" />
                    ),
                }}
            />
            
            
        </Tab.Navigator>
    );
}
export default function NurseNavigation(){
    return(
        <NavigationContainer>
            <MyTabs></MyTabs>
        </NavigationContainer>
    );
}
