
import { ImageBackground, StyleSheet, View } from "react-native";
import IMAGES from "../assets/images";

export default function TabBackground(props: any){

    return(
      
      <ImageBackground source={IMAGES.loginBackground} resizeMode="cover" style={{flex: 1}} >
        <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.85)', alignItems: 'center', }}>
          {props.children}
        </View>
      </ImageBackground>
    
    );
}