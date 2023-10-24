import React from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import NurseHome from '../../Components/Nurse/NurseHome.js'
import NurseReportScreen from '../../ScreensPrueba/NurseReport.js'              
import NurseHistoryScreen from '../../ScreensPrueba/NurseHistory.js';           
import NurseResignationScreen from '../../Components/Nurse/NurseResignation.js';   
import NurseProfileScreen from '../../ScreensPrueba/NurseProfile.js'; 

import { Entypo, Ionicons, FontAwesome5, EvilIcons, FontAwesome  } from '@expo/vector-icons';
import AtentionNurseNav from './AtentionNurseNav.js';
import HistoryAtentionNurse from '../../Components/Nurse/HistoryAtentionNurse/HistoryAtentionNurse.js';
import HistoyAtentionsNurseNav from './HistoyAtentionsNurseNav.js';
import GeneralProfile from '../../Components/General/GeneralProfile.js';

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
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#000000',
                tabBarActiveBackgroundColor: '#02D4A1',
                
                headerShown: false,
                tabBarStyle: {
                         
                   backgroundColor: '#ffffff',                 
                   height: height,
                   borderColor: '#000000',
                   
                }
            }}
            >
            <Tab.Screen 
                name="Home" 
                component={AtentionNurseNav}
                options={{           
                            
                    tabBarIcon: ({ color, size}) => (
                        <Entypo name="home" size={30} color="black" />
                    ),
                }}
            
            />
          
            <Tab.Screen 
                name="Historial" 
                component={HistoyAtentionsNurseNav } 
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
                component={GeneralProfile} 
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
            <MyTabs></MyTabs>
    );
}