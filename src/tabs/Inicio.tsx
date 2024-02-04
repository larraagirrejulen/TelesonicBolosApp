
import { useEffect } from "react";
import { Image, StyleSheet, Text } from "react-native";
import TabBackground from "./TabBackground";
import IMAGES from "../assets/images.js";
import { useUserContext } from "../ts/context";

export default function Horas(){

    const {user} = useUserContext();

    return(
      <TabBackground>
        <Image source={IMAGES.logo} style={styles.userImage} resizeMode='contain' />
        <Text style={styles.text}>Bienvenido {user?.name?.split(' ')[0]}!</Text>
      </TabBackground>
    );
}

const styles = StyleSheet.create({
    userImage: { 
      marginTop: 100, 
      marginBottom: 20, 
      width: 100,
      height: 100
    },
    text:{
      fontSize: 26, color: '#414d63', textShadowColor: 'rgba(255, 255, 255, .8)', 
      textShadowRadius: 1, marginBottom: 30,fontWeight: '600',
    },
    googleLogin: {
      flex: 1, paddingTop: 65, alignItems: 'center', borderRadius: 10, borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, .4)', backgroundColor: 'rgba(255, 255, 255, .3)'
    },
});