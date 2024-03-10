
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import CustomBackground from "customWidgets/CustomBackground";

import STYLES from 'config/styles';
import COLORS from "config/colors";
import { useLocaleContext } from "contexts/localeContext";


export default function CustomTab({ loading, title, event, children }:any){

    const {locale} = useLocaleContext();

    return(
        <CustomBackground>
            <View style={{... styles.titleView, ... STYLES.shadow}}>
                <View style={{borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginBottom: 15,}}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>{title}</Text>
                    <Text style={{fontSize: 16}}><Text style={{fontWeight: 'bold'}}>{locale.parts.hours.event}</Text>{event?.title}</Text>
                    <Text style={{fontSize: 16, marginBottom: 15}}><Text style={{fontWeight: 'bold'}}>{locale.parts.hours.date}</Text>{event?.date}</Text>
                </View>

                {loading ? 
                    <ActivityIndicator style={{paddingVertical: 50}} size='large' color={COLORS.appThemeColor} />
                : <>{children}</> } 
            </View>   
        </CustomBackground>
    )
}

const styles = StyleSheet.create({
    titleView: {
        paddingLeft: 15,
        backgroundColor: 'white', 
        borderRadius: 10,  
        marginVertical: 15,
        padding: 15
    },
    totalHours: {
        backgroundColor: 'white', 
        borderRadius: 10, 
        padding: 10, 
        marginLeft: 10,
        marginTop: 15
    },
  });