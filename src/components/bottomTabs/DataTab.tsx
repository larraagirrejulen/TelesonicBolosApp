
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";

import CustomBackground from "customWidgets/CustomBackground";

import COLORS from "config/colors";


export default function DataTab(){

    useFocusEffect(()=>{
        StatusBar.setBackgroundColor(COLORS.statusBarBackground)
    })

    return(
        <CustomBackground>
            <Text>Gastos</Text>
        </CustomBackground>
    );
}