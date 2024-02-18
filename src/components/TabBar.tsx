
import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Inicio from 'tabs/Inicio.tsx';
import Partes from 'tabs/Partes.tsx';
import Estadisticas from 'tabs/Estadisticas.tsx';
import Perfil from 'tabs/Perfil.tsx';

import IMAGES from 'src/constants/images';
import { reusableStyles } from 'styles/reusableStyles';
import COLORS from 'src/constants/colors';


export default function TabBar(): React.JSX.Element {

    const Tab = createBottomTabNavigator();

    type TabType = {name: string, source: ImageSourcePropType, component: ()=>React.JSX.Element};
    const tabs: Array<TabType> = [
        {name: 'Inicio', source: IMAGES.logo, component: Inicio},
        {name: 'Partes', source: IMAGES.orders, component: Partes},
        {name: 'Datos', source: IMAGES.data, component: Estadisticas},
        {name: 'Perfil', source: IMAGES.account, component: Perfil}
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
                        ... reusableStyles.shadow,
                        ... styles.navigationBar
                    }
                }} >
                {tabs.map((tab: TabType)=>(
                    <Tab.Screen key={tab.name} name={tab.name} component={tab.component} options={{
                        tabBarIcon: ({ focused })=> (
                            <View style={{alignItems: 'center', justifyContent: 'center', width: 45}}>
                                <Image source={tab.source} resizeMode='contain' style={{ 
                                    tintColor: focused ? COLORS.appThemeColor : COLORS.appDisabledColor, width: 25, height: 25,
                                }}/>
                                <Text style={{ 
                                    color: focused ? COLORS.appThemeColor : COLORS.appDisabledColor, fontSize: 12, fontWeight: 'bold'
                                }}>{tab.name.toUpperCase()}</Text>
                            </View>   
                        )
                    }} />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
  
}

const styles = StyleSheet.create({
    navigationBar: {
        position: 'absolute',
        bottom: 15,
        marginHorizontal: '3%',
        backgroundColor: "#ffffff",
        borderRadius: 15,
        height: 65,
    }
});