
import React, { useEffect, useState } from 'react';
import {ImageBackground, Image, StyleSheet,Text,View,StatusBar, Alert, ActivityIndicator} from 'react-native';
import {GoogleSignin,GoogleSigninButton,statusCodes,} from '@react-native-google-signin/google-signin';
import { BlurView } from "@react-native-community/blur";
import SplashScreen from 'react-native-splash-screen';

import IMAGES from 'src/constants/images';
import { useUserContext } from 'contexts/userContext';

import axios from 'axios';
import { SERVER_IP } from '@env';



export default function LogIn() {

  const [signingIn, setSigningIn] = useState(false);

  const {setUser} = useUserContext();

  useEffect(()=>{
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('rgb(50, 51, 50)');
    SplashScreen.hide();
  }, []);

  const onGoogleButtonPress = async () => {

    try{
      setSigningIn(true);

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const result = await GoogleSignin.signIn();

      axios.post(SERVER_IP + '/api/signIn', {serverAuthCode: result.serverAuthCode, email: result.user.email})
      .then(() => setUser(result.user));

    }catch (error: any) {
      if (error.code !== statusCodes.SIGN_IN_CANCELLED && error.code !== statusCodes.IN_PROGRESS) {
          Alert.alert("Error:", error.message);
      }
      setSigningIn(false);
    }
    
  }

  return (
    <ImageBackground source={IMAGES.background} resizeMode="cover" style={styles.background} >
      <BlurView style={styles.glassPanel} blurType="light" blurAmount={13}>
        <View style={styles.wrapper}>
          <Image source={IMAGES.logo} style={styles.logo}></Image>
          <Text style={styles.text}>Telesonic Bolos</Text>
          {signingIn ? 
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
  wrapper: {
    flex: 1, paddingTop: "20%", alignItems: 'center', borderRadius: 15, borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .4)', backgroundColor: 'rgba(255, 255, 255, .3)'
  },
  logo:{ width: "30%", height: "30%", marginBottom: "3%", marginLeft: "3%" },
  text:{
    fontSize: 26, color: 'rgb(0, 0, 0)', textShadowColor: 'rgba(255, 255, 255, .8)', 
    textShadowRadius: 1, fontWeight: 'bold', marginBottom: "15%"
  }
});
