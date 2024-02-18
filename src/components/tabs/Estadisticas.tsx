
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text, View } from "react-native";

import COLORS from "src/constants/colors";
import CustomBackground from "tabs/CustomBackground";

export default function Estadisticas(){

    useFocusEffect(()=>{
        StatusBar.setBackgroundColor(COLORS.statusBarBackground)
    })

    return(
        <CustomBackground>
            <Text>Gastos</Text>
        </CustomBackground>
    );
}