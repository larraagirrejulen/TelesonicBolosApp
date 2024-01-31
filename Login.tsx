
import React from 'react';
import {ImageBackground, Image, StyleSheet,Text,View,StatusBar, Alert} from 'react-native';
import {GoogleSignin,GoogleSigninButton,statusCodes,} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { BlurView } from "@react-native-community/blur";

import IMAGES from './assets/images.js';


const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glassPanel: { width: "90%", height: "55%" },
  text:{
    fontSize: 26, color: 'rgb(0, 0, 0)', textShadowColor: 'rgba(255, 255, 255, .8)', 
    textShadowRadius: 1, fontWeight: 'bold', marginBottom: 30
  },
  googleLogin: {
    flex: 1, paddingTop: 65, alignItems: 'center', borderRadius: 15, borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .4)', backgroundColor: 'rgba(255, 255, 255, .3)'
  },
  logo:{ width: 100, height: 100, marginBottom: 10, marginLeft: 10 }
});


export default function Login(this: any): React.JSX.Element {

  const onGoogleButtonPress = async () => {
    try{

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      return auth().signInWithCredential(googleCredential);

    }catch (error: any) {
      if (error.code !== statusCodes.SIGN_IN_CANCELLED && error.code !== statusCodes.IN_PROGRESS) {
          Alert.alert("Error:", error.message);
      }
    }
  }

  return (<>
    <StatusBar backgroundColor='rgb(50, 50, 50)' hidden={false}/>
    <ImageBackground source={IMAGES.loginBackground} resizeMode="cover" style={styles.background} >
      <BlurView style={styles.glassPanel} blurType="light" blurAmount={13}>
        <View style={styles.googleLogin}>
          <Image source={IMAGES.logo} style={styles.logo}></Image>
          <Text style={styles.text}>Bolos Telesonic</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={onGoogleButtonPress}
          />
        </View>
      </BlurView>
    </ImageBackground>
  </>);
}
