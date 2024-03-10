
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useLocaleContext } from "contexts/localeContext";

import LOCALES from "config/locales";
import STYLES from 'config/styles';



export default function LanguageSelector(){

    const {locale, setLocale} = useLocaleContext();

    const styles = StyleSheet.create({
        label: { 
          ... STYLES.text,
          fontWeight: 'bold' 
        },
        dropdow: { 
            height: 40,
            width: 130,
            backgroundColor: 'white',
            borderRadius: 8,
            paddingHorizontal: 12,
            ... STYLES.shadow
        }
    });

    return(

        <View style={{flexDirection: 'row', ... STYLES.center, marginBottom: 25}}>
          <Text style={styles.label}>
            {locale.languageSelector}
          </Text>
          <Dropdown
            value={locale.language}
            data={[
              {label: 'Castellano', value: 'es'},
              {label: 'Euskara', value: 'eus'}
            ]}
            onChange={(item: any) => {
              AsyncStorage.setItem('language', item.value);
              setLocale(LOCALES[item.value as 'es' | 'eus']);
            } }
            style={styles.dropdow}
            labelField={"label"} 
            valueField={"value"}        
          />
        </View>

    );

}