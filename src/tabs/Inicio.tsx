
import { Image, StatusBar, StyleSheet, Text } from "react-native";
import IMAGES from "../assets/images.js";
import { useUserContext } from "../ts/context";
import { useFocusEffect } from "@react-navigation/native";

export default function Horas(){

    const {user} = useUserContext();

    useFocusEffect(()=>{
      StatusBar.setBackgroundColor('rgb(217, 217, 217)')
    })

    return(<>
      <Image source={IMAGES.logo} style={styles.userImage} resizeMode='contain' />
      <Text style={styles.text}>Bienvenido {user?.name?.split(' ')[0]}!</Text>
    </>);
}

const styles = StyleSheet.create({
    userImage: { 
      marginTop: 110, 
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