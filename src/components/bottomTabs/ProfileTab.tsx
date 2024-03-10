
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useUserContext } from "contexts/userContext";
import { useLocaleContext } from "contexts/localeContext";

import CustomBackground from "customWidgets/CustomBackground";
import LanguageSelector from "customWidgets/LanguageSelector";
import CustomButton from "customWidgets/CustomButton";

import COLORS from "config/colors";
import STYLES from 'config/styles';


export default function ProfileTab(){

  const {user, setUser} = useUserContext();
  const {locale} = useLocaleContext();

  useFocusEffect(()=>{
    StatusBar.setBackgroundColor(COLORS.statusBarBackground);
  })

  const logout = () => {
    Alert.alert(locale.profile.confirmLogout, '', [
        {text:  locale.accept, onPress: () => {GoogleSignin.signOut(); setUser(undefined)}},
        {text: locale.cancel, style: 'cancel'},
    ],{cancelable: true},);
  };

  return(
    <CustomBackground>
      <View style={styles.wrapper}>
          <Image source={{uri: user?.photo as string}} style={styles.userImage} />
          <View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
      </View>
      <LanguageSelector />
      <CustomButton onPress={logout} text={locale.profile.logout} backgroundColor={'#ea493f'}/>
    </CustomBackground>
  
  );
}

const styles = StyleSheet.create({
    wrapper: {
      marginTop: '20%',
      paddingVertical: '8%',
      backgroundColor: 'rgba(0,0,0,0)',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userImage: {
      width: 72,
      height: 72,
      borderRadius: 50,
    },
    userName: {
      marginTop: '4%',
      ... STYLES.title
    },
    userEmail: {
      marginTop: '1%',
      ... STYLES.text
    },
});