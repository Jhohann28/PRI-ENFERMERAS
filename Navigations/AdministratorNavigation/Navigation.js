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
import AtentionsListAdmin from '../../Components/Administrator/AtentionsListAdmin';
import AtentionAdminNavigation from './AtentionAdminNavigation';
import { Platform } from 'react-native';
import AdminAtentionRequestList from '../../Components/Administrator/AdminAtentionRequestList';
import AtentionRequestNav from './AtentionRequestNav';
import JobDetails from '../../Components/Administrator/JobDetails';
import GeneralProfile from '../../Components/General/GeneralProfile';
import JobRequestNav from './JobRequestNav';



const Tab = createBottomTabNavigator();

function MyTabs(){
    let height =60;
    if(Platform.OS =="ios"){
        height=70;
    }
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
                   height: height,
                   borderColor: '#000000',
                   borderTopWidth: 0,
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
                component={AtentionAdminNavigation } 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <Ionicons name="documents" size={30} color="white" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Sol. Trabajo" 
                component={ JobRequestNav} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome5 name="grip-lines" size={30} color="white" /> 
                    ),
                }}
                 
            />
            <Tab.Screen 
                name="Sol. Atencion" 
                component={AtentionRequestNav} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome5 name="envelope-open-text" size={30} color="white" />  
                    ),
                }}
            />
            <Tab.Screen 
                name="Perfil" 
                component={GeneralProfile} 
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
