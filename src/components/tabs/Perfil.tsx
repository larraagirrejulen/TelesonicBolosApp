
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert, Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useUserContext } from "contexts/userContext";
import CustomBackground from "tabs/CustomBackground";
import { reusableStyles } from "styles/reusableStyles";
import COLORS from "src/constants/colors";


export default function Perfil(){

  const {user, setUser} = useUserContext();

  useFocusEffect(()=>{
    StatusBar.setBackgroundColor(COLORS.statusBarBackground);
  })

  return(
    <CustomBackground>
      <View style={styles.wrapper}>
          <Image source={{uri: user?.photo as string}} style={styles.userImage} />
          <View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
      </View>
      <Pressable style={{... reusableStyles.customButton, ... reusableStyles.shadow, backgroundColor: '#ea493f'}}
        onPress={() => {
          Alert.alert('Confirma el cierre de sesión:', '', [
              {text: 'Aceptar', onPress: () => {GoogleSignin.signOut(); setUser(undefined)}},
              {text: 'Cancelar', style: 'cancel'},
          ],{cancelable: true,},);
        }} 
      >
        <Text style={reusableStyles.customButtonText}>Cerrar Sesión</Text>
      </Pressable>
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
      fontSize: 22,
      fontWeight: '600',
      color: COLORS.appTextColor,
      textAlign: 'center',
    },
    userEmail: {
      marginTop: '1%',
      fontSize: 16,
      color: COLORS.appTextColor,
      textAlign: 'center',
    },
});