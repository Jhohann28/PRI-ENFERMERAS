import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import UsereHome from '../../Components/User/UserHomeInterface.js'
  
import NurseHistoryScreen from '../../ScreensPrueba/NurseHistory.js';           
 
import NurseProfileScreen from '../../ScreensPrueba/NurseProfile.js'; 

import { Entypo, Ionicons, FontAwesome5, EvilIcons, FontAwesome  } from '@expo/vector-icons';

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
                   borderTopRightRadius: 10,
                   borderColor: '#ffffff'
                }
            }}
            >
            <Tab.Screen 
                name="Home" 
                component={UsereHome}
                options={{           
                    
                    tabBarIcon: ({ color, size}) => (
                        <Entypo name="home" size={24} color="#ffffff" />
                    ),
                }}
            
            />   
            <Tab.Screen 
                name="Historial" 
                component={NurseHistoryScreen} 
                options={{                   
                    tabBarIcon: ({ color, size}) => (
                        <FontAwesome5 name="grip-lines" size={24} color="#ffffff" /> 
                    ),
                }}    
            />            
            <Tab.Screen 
                name="Perfil" 
                component={NurseProfileScreen} 
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
        <NavigationContainer>
            <MyTabs></MyTabs>
        </NavigationContainer>
    );
}
