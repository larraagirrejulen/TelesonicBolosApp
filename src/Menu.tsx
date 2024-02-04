
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Inicio from './tabs/Inicio.tsx';
import Partes from './tabs/Partes.tsx';
import Estadisticas from './tabs/Estadisticas.tsx';
import Perfil from './tabs/Perfil.tsx';

import IMAGES from './assets/images.js';
import SplashScreen from 'react-native-splash-screen';

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

const CustomTabBarButton = ({children, onPress}:any) => (
    <TouchableOpacity
        onPress={onPress}
    >
        <View style={{
            top: -25,
            width: 50,
            height: 50,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3fabea',
            ... styles.shadow
        }}>
            {children}
        </View>
    </TouchableOpacity> 
);
export default function Menu(): React.JSX.Element {

    useEffect(()=>{
        SplashScreen.hide();
    }, [])

    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName='Inicio' backBehavior='history' 
                screenOptions={{
                    headerShown: false, tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 15,
                        left: 15,
                        right: 15,
                        backgroundColor: "#ffffff",
                        borderRadius: 15,
                        height: 70,
                        ... styles.shadow
                    }
                }} >
                <Tab.Screen name="Inicio" options={{
                    tabBarIcon: ({focused}) => (
                        customTabScreenButton({source: IMAGES.logo, focused, text:'INICIO'})
                    )
                }} >
                    {() => <Inicio />}
                </Tab.Screen>
                <Tab.Screen name="Partes" component={Partes} options={{
                    tabBarIcon: ({focused}) => (
                        customTabScreenButton({source: IMAGES.partes, focused, text:'PARTES'})  
                    )
                }}/>
                <Tab.Screen name="Nuevo Parte" component={Partes} options={{
                    tabBarIcon: () => (
                        <Image 
                            source={IMAGES.nuevoParte} 
                            resizeMode='contain'
                            style={{ width: 25, height: 25, tintColor: 'white' }}
                        />
                    ),
                    tabBarButton: (props:any) => (
                        <CustomTabBarButton {...props} />
                    )
                }}/>
                <Tab.Screen name="Estadisticas" component={Estadisticas} options={{
                    tabBarIcon: ({focused}) => (
                        customTabScreenButton({source: IMAGES.datos, focused, text:'DATOS'})   
                    )
                }}/>
                <Tab.Screen name="Perfil" options={{
                    tabBarIcon: ({focused}) => (
                        customTabScreenButton({source: IMAGES.account, focused, text:'CUENTA'})  
                    )
                }} >
                    {() => <Perfil />}
                </Tab.Screen>
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

});