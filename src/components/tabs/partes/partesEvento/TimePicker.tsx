
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';

import COLORS from 'src/constants/colors';
import IMAGES from 'src/constants/images';
import { reusableStyles } from 'styles/reusableStyles';


const initialDateTime = new Date("2000-01-01T12:00:00");


export default function CustomTimePicker({session, start, setStart, end, setEnd}:any) {

    const [timePickerVisible, setTimePickerVisible] = useState('');
  
    const handleTimeConfirm = (date: Date, timePicker: string) => {
        const time = date.toLocaleTimeString().split(':').slice(0, 2).join(':');
        timePicker === 'start' ? setStart(time) : setEnd(time);
        setTimePickerVisible('');
    };
  
    return (
      <View style={{alignItems: 'flex-start'}}>

        <Text style={styles.workSession}>Sesión de trabajo {session}</Text>

        <View style={styles.sesionView}>

            <Text style={styles.sesionStart} onPress={()=>setTimePickerVisible('start')}>
                <Text style={{fontWeight: 'bold'}}>De  </Text>
                <Text>{start ? start : 'Hora inicio'}</Text>
            </Text>

            <Text style={styles.sessionEnd} onPress={()=>setTimePickerVisible('end')}>
                <Text style={{fontWeight: 'bold'}}>a  </Text>
                <Text>{end ? end : 'Hora final'}</Text>
            </Text>
            
            { (start || end) &&
                <Text 
                    style={{paddingLeft: 10}}
                    onPress={()=>{setStart(undefined), setEnd(undefined)}}
                >
                    <Image source={IMAGES.delete} style={styles.deleteSession} resizeMode='contain' />
                </Text>
            }
        </View>
       
        <DatePicker
            modal
            open={timePickerVisible !== ''}
            date={initialDateTime}
            mode="time"
            onConfirm={(date)=>handleTimeConfirm(date, timePickerVisible)}
            onCancel={()=>setTimePickerVisible('')}
            minuteInterval={15}
            title={timePickerVisible === 'start' ? 'Selecciona la hora de inicio:' : 'Selecciona la hora final:'}
            confirmText='Confirmar'
            cancelText='Cancelar'
        />

      </View>
    );
};
  
const styles = StyleSheet.create({
    sesionView: {
        marginBottom: 15, 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignContent: 'center', 
        ... reusableStyles.shadow
    },
    sesionStart: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white', 
        borderRadius: 10, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRightColor: '#dbdbdb', 
        borderRightWidth: 1, 
        borderTopRightRadius: 0, 
        borderBottomRightRadius: 0,
        ... reusableStyles.shadow
    },
    sessionEnd: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white', 
        borderRadius: 10, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderTopLeftRadius: 0, 
        borderBottomLeftRadius: 0,
        ... reusableStyles.shadow
    },
    workSession: {
        marginBottom: 8,
        color: COLORS.appTextColor, 
        paddingLeft: 5
    },
    deleteSession: {
        tintColor: '#ea493f', 
        width: 25, 
        height: 25
    }
  });