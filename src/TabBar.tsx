
import React, { useEffect } from 'react';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Inicio from './tabs/Inicio.tsx';
import Partes from './tabs/Partes.tsx';
import Estadisticas from './tabs/Estadisticas.tsx';
import Perfil from './tabs/Perfil.tsx';

import IMAGES from './assets/images.js';


const Tab = createBottomTabNavigator();

function customTabScreenButton({source, focused, text}:any){
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image  source={source} resizeMode='contain' style={{ 
                tintColor: focused ? '#00a0ff' : '#7a7a7a', width: 25, height: 25,
            }}/>
            <Text style={{ 
                color: focused ? '#00a0ff' : '#7a7a7a', fontSize: 12, fontWeight: 'bold'
            }}>{text}</Text>
        </View>   
    );
}


export default function TabBar(): React.JSX.Element {

    const tabs:any = [
        {name: 'Inicio', source: IMAGES.logo, component: <Inicio />, statusBarBackground: 'rgb(217, 217, 217)'},
        {name: 'Partes', source: IMAGES.partes, component: <Partes />, statusBarBackground: 'rgb(255, 255, 255)'},
        {name: 'Datos', source: IMAGES.datos, component: <Estadisticas />, statusBarBackground: 'rgb(217, 217, 217)'},
        {name: 'Perfil', source: IMAGES.account, component: <Perfil />, statusBarBackground: 'rgb(217, 217, 217)'}
    ];

    useEffect(()=>{
        StatusBar.setBarStyle('dark-content');
        SplashScreen.hide();
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName='Inicio' backBehavior='history' 
                screenOptions={{
                    headerShown: false, 
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        ... styles.shadow,
                        ... styles.navigationBar
                    }
                }} >
                {tabs.map((tab:any)=>(
                    <Tab.Screen key={tab.name} name={tab.name} options={{
                        tabBarIcon: ({focused}) => (
                            customTabScreenButton({source: tab.source, focused, text: tab.name.toUpperCase()})
                        )
                    }} >
                        {() => 
                            <ImageBackground source={IMAGES.loginBackground} resizeMode="cover" style={{flex: 1}} >
                                <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.85)', alignItems: 'center', }}>
                                    {tab.component}
                                </View>
                            </ImageBackground>
                        }
                    </Tab.Screen>
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
  
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    navigationBar: {
        position: 'absolute',
        bottom: 12,
        marginHorizontal: 12,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        height: 65,
    }

});