
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import COLORS from "config/colors";
import STYLES from "config/styles";


export default function CustomButton({onPress, text, backgroundColor, loading, lightBorder}: any){

    const styles = StyleSheet.create({
        text: { 
            ... STYLES.text,
            color: 'white',
            fontWeight: 'bold',
        },
        pressable: { 
            ... STYLES.center,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            backgroundColor: COLORS.appThemeColor,
        }
    });

    return(

        <Pressable 
            style={{ ... styles.pressable, ... STYLES.shadow, backgroundColor: backgroundColor, borderColor: 'rgba(255, 255, 255, .2)', borderWidth: lightBorder ? 1.5 : 0}}
            onPress={()=>onPress()} 
            disabled={loading}
        >
            {loading ? 
                <ActivityIndicator size='small' color='white' />
            : <Text style={styles.text}>{text}</Text>}
            
        </Pressable>

    );

}