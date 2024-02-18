
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text, View } from "react-native";
import CustomBackground from "tabs/CustomBackground";
import Horas from "./Horas";

const Tab = createMaterialTopTabNavigator();



export default function Event(){

    return(
        <Tab.Navigator>
            <Tab.Screen name="Horas" component={Horas} />
            <Tab.Screen name="Gastos" component={Gastos} />
            <Tab.Screen name="Incidencias" component={Incidencias} />
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

