
import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import HomeTab from 'components/bottomTabs/HomeTab';
import PartsTab from 'components/bottomTabs/PartsTab';
import DataTab from 'components/bottomTabs/DataTab';
import ProfileTab from 'components/bottomTabs/ProfileTab';

import IMAGES from 'config/images';
import STYLES from 'config/styles';
import COLORS from 'config/colors';
import { useLocaleContext } from 'contexts/localeContext';


export default function BottomTabBar(): React.JSX.Element {

    const Tab = createBottomTabNavigator();

    const {locale} = useLocaleContext();

    type TabType = {name: string, source: ImageSourcePropType, component: ()=>React.JSX.Element};
    const tabs: Array<TabType> = [
        {name: locale.tabs[0], source: IMAGES.logo, component: HomeTab},
        {name: locale.tabs[1], source: IMAGES.orders, component: PartsTab},
        {name: locale.tabs[2], source: IMAGES.data, component: DataTab},
        {name: locale.tabs[3], source: IMAGES.account, component: ProfileTab}
    ];

    useEffect(()=>{
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(COLORS.statusBarBackground);
        SplashScreen.hide();
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName={locale.tabs[0]}
                backBehavior='history' 
                screenOptions={{
                    headerShown: false, 
                    tabBarShowLabel: false,
                    tabBarStyle: {... styles.bottomTabBar}
                }} 
            >
                {tabs.map((tab: TabType)=>(
                    <Tab.Screen key={tab.name} name={tab.name} component={tab.component} options={{
                        tabBarIcon: ({ focused })=> (
                            <View style={styles.tabBarIconView}>
                                <Image source={tab.source} resizeMode='contain' style={{ 
                                    tintColor: focused ? COLORS.appThemeColor : COLORS.appDisabledColor, ... styles.tabBarIconImage
                                }}/>
                                <Text style={{ 
                                    color: focused ? COLORS.appThemeColor : COLORS.appDisabledColor, ... styles.tabBarIconText
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
    bottomTabBar: {
        position: 'absolute',
        bottom: 15,
        marginHorizontal: '3%',
        backgroundColor: "#ffffff",
        borderRadius: 15,
        height: 65,
        ... STYLES.shadow
    },
    tabBarIconView: {
        ... STYLES.center,
        width: 60
    },
    tabBarIconImage: {
        width: 25, height: 25
    },
    tabBarIconText: {
        fontSize: 12, fontWeight: 'bold'
    }
});