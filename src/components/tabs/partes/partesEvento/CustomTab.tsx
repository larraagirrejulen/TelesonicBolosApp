
import { reusableStyles } from "src/styles/reusableStyles";
import CustomBackground from "../../CustomBackground";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import COLORS from "src/constants/colors";


export default function CustomTab({ loading, title, event, children }:any){

    return(
        <CustomBackground>
            <View style={{... styles.titleView, ... reusableStyles.shadow}}>
                <View style={{borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginBottom: 15,}}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>{title}</Text>
                    <Text style={{fontSize: 16}}><Text style={{fontWeight: 'bold'}}>Evento: </Text>{event?.title}</Text>
                    <Text style={{fontSize: 16, marginBottom: 15}}><Text style={{fontWeight: 'bold'}}>Fecha: </Text>{event?.date}</Text>
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