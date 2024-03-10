
import { StyleSheet } from "react-native";

import COLORS from "config/colors";

const STYLES = StyleSheet.create({
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
    center: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        letterSpacing: 0.50,
        textAlign: 'center',
        color: COLORS.appTextColor,
    },
    text: {
        fontSize: 16,
        letterSpacing: 0.25,
        textAlign: 'center',
        color: COLORS.appTextColor
    },
});

export default STYLES;