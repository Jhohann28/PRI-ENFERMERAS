import React from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import AdminHome from '../../Components/Administrator/AdminHomeInterface'
  
import NurseReportScreen from '../../ScreensPrueba/NurseReport.js'              
import NurseHistoryScreen from '../../ScreensPrueba/NurseHistory.js';           
import NurseResignationScreen from '../../ScreensPrueba/NurseResignation.js';   
import NurseProfileScreen from '../../ScreensPrueba/NurseProfile'; 
import AcceptContactDeclineRequest from "../../Components/Administrator/AceptContactDeclineRequest"

import { Entypo, Ionicons, FontAwesome5, EvilIcons, FontAwesome  } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator 
            initialRouteName='Home'        
            screenOptions={{
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#ffffff',
                tabBarActiveBackgroundColor: '#343D55',
                //315488
                headerShown: false,
                tabBarStyle: {
                         
                   backgroundColor: '#315488',                 
                   height: 60,
                   borderColor: '#000000',
                   borderTopWidth: 3,
                }
            }}
            >
            <Tab.Screen 
                name="Home" 
                component={HomeNavigation}
                
                options={{           
                            
                    tabBarIcon: ({ color, size}) => (
                        <Entypo name="home" size={30} color="white" />                      
                    ),                   
                }}
            
            />
            <Tab.Screen 
                name="Atenciones" 
                component={NurseReportScreen} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <Ionicons name="documents" size={30} color="white" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Sol. Trabajo" 
                component={AcceptContactDeclineRequest} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome5 name="grip-lines" size={30} color="white" /> 
                    ),
                }}
                 
            />
            <Tab.Screen 
                name="Sol. Atencion" 
                component={NurseResignationScreen} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome5 name="envelope-open-text" size={30} color="white" />  
                    ),
                }}
            />
            <Tab.Screen 
                name="Perfil" 
                component={NurseProfileScreen} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome name="user" size={35} color="white" />
                    ),
                }}
            />
            
            
        </Tab.Navigator>
    );
}
export default function AdminNavigation(){
    return(
       
            <MyTabs></MyTabs>
        
    );
}
