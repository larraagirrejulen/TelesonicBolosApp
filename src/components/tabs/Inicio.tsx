
import { Image, StatusBar, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import IMAGES from "src/constants/images";
import { useUserContext } from "contexts/userContext";
import CustomBackground from "tabs/CustomBackground";
import COLORS from "src/constants/colors";

export default function Horas(){

    const {user} = useUserContext();

    useFocusEffect(()=>{
      StatusBar.setBackgroundColor(COLORS.statusBarBackground)
    })

    return(
      <CustomBackground>
        <Image source={IMAGES.logo} style={styles.logo} resizeMode='contain' />
        <Text style={styles.text}>Bienvenido {user?.name?.split(' ')[0]}!</Text>
      </CustomBackground>
    );
}

const styles = StyleSheet.create({
    logo: { 
      marginTop: '30%', 
      marginBottom: '5%', 
      width: 100,
      height: 100
    },
    text:{
      fontSize: 26, color: COLORS.appTextColor, textShadowColor: 'rgba(255, 255, 255, .8)', 
      textShadowRadius: 1, fontWeight: '600',
    }
});