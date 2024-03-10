import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useLocaleContext } from "contexts/localeContext";

import Horas from "./Horas";
import CustomBackground from "customWidgets/CustomBackground";
import { Text, View } from "react-native";


export default function TopTabBar(){

    const Tab = createMaterialTopTabNavigator();

    const {locale} = useLocaleContext();

    const localePartes = locale.parts;

    return(
        <Tab.Navigator>
            <Tab.Screen name={localePartes.hours.tabName} component={Horas} />
            <Tab.Screen name={localePartes.expenses.tabName} component={Gastos} />
            <Tab.Screen name={localePartes.incidents.tabName} component={Incidencias} />
        </Tab.Navigator>
    );

    

}

function Gastos(){
    return(
        <CustomBackground>
            <View><Text>Gastos</Text></View>
        </CustomBackground>
    )
}

function Incidencias(){
    return(
        <CustomBackground>
            <View><Text>Incidencias</Text></View>
        </CustomBackground>
    )
}
