import React from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import UsereHome from '../../Components/User/UserHomeInterface.js'
  
import NurseHistoryScreen from '../../ScreensPrueba/NurseHistory.js';           
 
import NurseProfileScreen from '../../ScreensPrueba/NurseProfile.js'; 

import { Entypo, Ionicons, FontAwesome5, EvilIcons, FontAwesome  } from '@expo/vector-icons';
import AttentionUserNav from './AttentionUserNav.js';
import HistoryAttentionUser from '../../Components/User/HistoryAttentionUser/HistoryAttentionUser.js';
import HistoryAtentionUserNav from './HistoryAtentionsUserNav.js';
import GeneralProfile from '../../Components/General/GeneralProfile.js';

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator 
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#ffffff',
                tabBarActiveBackgroundColor: '#0B3068',
                
                headerShown: false,
                tabBarStyle: {
                         
                   backgroundColor: '#0367AF',
                   borderTopLeftRadius: 10,
                   
                   borderColor: '#ffffff'
                }
            }}
            >
            <Tab.Screen 
                name="Home" 
                component={AttentionUserNav}
                options={{           
                    
                    tabBarIcon: ({ color, size}) => (
                        <Entypo name="home" size={24} color="#ffffff" />
                    ),
                }}
            />   
            <Tab.Screen 
                name="Historial" 
                component={HistoryAtentionUserNav} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome5 name="grip-lines" size={24} color="#ffffff" /> 
                    ),
                }}    
            />            
            <Tab.Screen 
                name="Perfil" 
                component={GeneralProfile} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome name="user" size={24} color="#ffffff" />
                    ),
                }}
            /> 
        </Tab.Navigator>
    );
}
export default function UserNavigation(){
    return(
            <MyTabs></MyTabs>
    );
}
