
import React, { useEffect, useState } from 'react';
import {ImageBackground, Image, StyleSheet,Text,View,StatusBar, Alert, ActivityIndicator} from 'react-native';
import {GoogleSignin,GoogleSigninButton,statusCodes,} from '@react-native-google-signin/google-signin';
import { BlurView } from "@react-native-community/blur";
import SplashScreen from 'react-native-splash-screen';

import IMAGES from './assets/images.js';
import { useUserContext } from './ts/context.ts';
import axios from 'axios';
import { SERVER_IP } from '@env';



export default function LogIn(): React.JSX.Element {

  const [loading, setLoading] = useState(false);

  const {setUser} = useUserContext();

  useEffect(()=>{
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('rgb(50, 51, 50)')
    SplashScreen.hide();
}, []);

  const onGoogleButtonPress = async () => {
    try{
      
      setLoading(true);

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const result = await GoogleSignin.signIn();

      const serverAuthCode = result.serverAuthCode;
      const email = result.user.email;

      axios.post(SERVER_IP + '/api/getUserTokens', {serverAuthCode, email})
      .then(() => setUser(result.user));

    }catch (error: any) {
      if (error.code !== statusCodes.SIGN_IN_CANCELLED && error.code !== statusCodes.IN_PROGRESS) {
          Alert.alert("Error:", error.message);
      }
      setLoading(false);
    }
  }

  return (
    <ImageBackground source={IMAGES.loginBackground} resizeMode="cover" style={styles.background} >
      <BlurView style={styles.glassPanel} blurType="light" blurAmount={13}>
        <View style={styles.googleLogin}>
          <Image source={IMAGES.logo} style={styles.logo}></Image>
          <Text style={styles.text}>Telesonic Bolos</Text>
          {loading ? 
            <ActivityIndicator size="large" /> 
          : 
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={onGoogleButtonPress}
            />
          }
        </View>
      </BlurView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glassPanel: { width: "90%", height: "55%" },
  text:{
    fontSize: 26, color: 'rgb(0, 0, 0)', textShadowColor: 'rgba(255, 255, 255, .8)', 
    textShadowRadius: 1, fontWeight: 'bold', marginBottom: 40
  },
  googleLogin: {
    flex: 1, paddingTop: 65, alignItems: 'center', borderRadius: 15, borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .4)', backgroundColor: 'rgba(255, 255, 255, .3)'
  },
  logo:{ width: 100, height: 100, marginBottom: 10, marginLeft: 10 }
});
