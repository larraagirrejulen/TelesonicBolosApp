import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text, View } from "react-native";

export default function Estadisticas(){

    useFocusEffect(()=>{
        StatusBar.setBackgroundColor('rgb(217, 217, 217)')
    })

    return(
        <Text>Gastos</Text>
    );
}