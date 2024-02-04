import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import TabBackground from "./TabBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "../ts/context";

export default function Perfil(){

  const {user, setUser} = useUserContext();

  return(
      <TabBackground>
          <SafeAreaView style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={{paddingVertical: 24}}>
                  <View style={styles.profile}>
                      <Image alt="" source={{uri: user?.photo as string}} style={styles.profileAvatar} />
                      <View>
                          <Text style={styles.profileName}>{user?.name}</Text>
                          <Text style={styles.profileAddress}>{user?.email}</Text>
                      </View>
                  </View>
                  <Button title="Cerrar Sesión" onPress={()=>{
                      Alert.alert('Confirma el cierre de sesión:', '', [
                          {text: 'Aceptar', onPress: () => {GoogleSignin.signOut(); setUser(undefined)}},
                          {text: 'Cancelar', style: 'cancel'},
                      ],{cancelable: true,},);
                  }} color={'#ea493f'}/>
              </ScrollView>
          </SafeAreaView>
      </TabBackground>
      
  );
}

const styles = StyleSheet.create({
    profile: {
        marginTop: 76,
        padding: 24,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 9999,
    },
    profileName: {
        marginTop: 20,
        fontSize: 19,
        fontWeight: '600',
        color: '#414d63',
        textAlign: 'center',
    },
    profileAddress: {
        marginTop: 5,
        fontSize: 16,
        color: '#414d63',
        textAlign: 'center',
    },
    /** Section */
    section: {
        paddingHorizontal: 24,
    },
      sectionHeader: {
        paddingVertical: 12,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
      },
      /** Row */
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
      },
      rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 9999,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      rowLabel: {
        fontSize: 17,
        fontWeight: '400',
        color: '#0c0c0c',
      },
      rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
});

const SECTIONS = [
    {
      header: 'Preferences',
      icon: 'settings',
      items: [
        { icon: 'globe', color: '#fe9400', label: 'Language', type: 'link' },
        {
          icon: 'moon',
          color: '#007afe',
          label: 'Dark Mode',
          value: false,
          type: 'boolean',
        },
        {
          icon: 'wifi',
          color: '#007afe',
          label: 'Use Wi-Fi',
          value: true,
          type: 'boolean',
        },
        { icon: 'navigation', color: '#32c759', label: 'Location', type: 'link' },
        {
          icon: 'users',
          color: '#32c759',
          label: 'Show collaborators',
          value: true,
          type: 'boolean',
        },
        {
          icon: 'airplay',
          color: '#fd2d54',
          label: 'Accessibility mode',
          value: false,
          type: 'boolean',
        },
      ],
    },
    {
      header: 'Help',
      icon: 'help-circle',
      items: [
        { icon: 'flag', color: '#8e8d91', label: 'Report Bug', type: 'link' },
        { icon: 'mail', color: '#007afe', label: 'Contact Us', type: 'link' },
      ],
    },
    {
      header: 'Content',
      icon: 'align-center',
      items: [
        { icon: 'save', color: '#32c759', label: 'Saved', type: 'link' },
        { icon: 'download', color: '#fd2d54', label: 'Downloads', type: 'link' },
      ],
    },
  ];