
import { Image, StatusBar, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useUserContext } from "contexts/userContext";
import { useLocaleContext } from "contexts/localeContext";

import CustomBackground from "customWidgets/CustomBackground";

import IMAGES from "config/images";
import COLORS from "config/colors";
import STYLES from 'config/styles';

export default function HomeTab(){

    const {user} = useUserContext();
    const {locale} = useLocaleContext();

    useFocusEffect(()=>{
      StatusBar.setBackgroundColor(COLORS.statusBarBackground)
    })

    return(
      <CustomBackground>
        <Image source={IMAGES.logo} style={styles.logo} resizeMode='contain' />
        <Text style={styles.text}>{locale.home} {user?.name?.split(' ')[0]}!</Text>
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
    textShadowColor: 'rgba(255, 255, 255, .8)', 
    textShadowRadius: 1, ... STYLES.title
  }
});