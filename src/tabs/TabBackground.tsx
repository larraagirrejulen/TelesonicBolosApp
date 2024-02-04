
import { ImageBackground, StatusBar, View } from "react-native";
import IMAGES from "../assets/images.js";

export default function TabBackground(props: any){

  return(<>

    <StatusBar backgroundColor='rgb(217, 217, 217)' barStyle='dark-content' hidden={false}/>
    <ImageBackground source={IMAGES.loginBackground} resizeMode="cover" style={{flex: 1}} >
      <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.85)', alignItems: 'center', }}>
        {props.children}
      </View>
    </ImageBackground>
    
  </>);
}