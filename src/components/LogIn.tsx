
import React, { useEffect, useState } from 'react';
import {ImageBackground, Image, StyleSheet,Text,View,StatusBar, Alert} from 'react-native';
import {GoogleSignin,statusCodes,} from '@react-native-google-signin/google-signin';
import { BlurView } from "@react-native-community/blur";
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';

import { useUserContext } from 'contexts/userContext';
import { useLocaleContext } from 'contexts/localeContext';

import CustomButton from 'customWidgets/CustomButton';

import { SERVER_IP } from '@env';
import IMAGES from 'config/images';
import COLORS from 'config/colors';



export default function LogIn() {

  const [signingIn, setSigningIn] = useState(false);

  const {setUser} = useUserContext();
  const {locale} = useLocaleContext();

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

      if(result.user.email.endsWith('@telesonic.es')){
        axios.post(SERVER_IP + '/api/signIn', {serverAuthCode: result.serverAuthCode, email: result.user.email})
        .then(() => setUser(result.user));
      }else{
        GoogleSignin.signOut();
        Alert.alert(locale.error, locale.login.emailRestriction);
        setSigningIn(false);
      }

    }catch (error: any) {
      if (error.code !== statusCodes.SIGN_IN_CANCELLED && error.code !== statusCodes.IN_PROGRESS) {
        console.log(error.message);
        Alert.alert(locale.error, locale.login.unknownLoginError);
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
          <CustomButton onPress={onGoogleButtonPress} text={locale.login.login} backgroundColor={COLORS.appThemeColor} loading={signingIn} lightBorder={true} />
        </View>
      </BlurView>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  glassPanel: { width: "80%", height: "55%", borderRadius: 8 },
  wrapper: {
    flex: 1, paddingTop: "25%", alignItems: 'center', borderRadius: 8, borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, .5)', backgroundColor: 'rgba(255, 255, 255, .3)'
  },
  logo:{ width: "30%", height: "30%", marginBottom: "3%", marginLeft: "3%" },
  text:{
    fontSize: 26, color: 'rgb(0, 0, 0)', textShadowColor: 'rgba(255, 255, 255, 1)', 
    textShadowRadius: 2, fontWeight: 'bold', marginBottom: "20%"
  }
});
