
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import axios from "axios";

import { useEventContext } from "contexts/eventContext";
import { useUserContext } from "contexts/userContext";

import CustomButton from "customWidgets/CustomButton";

import CustomTimePicker from "./TimePicker";
import CustomTab from "./CustomTab";

import { SERVER_IP } from "@env";
import COLORS from "config/colors";
import { useLocaleContext } from "contexts/localeContext";


export default function Horas(){

    const {locale} = useLocaleContext();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const {event} = useEventContext();
    const {user} = useUserContext();

    const [horasTotales, setHorasTotales] = useState(0);
    const [horasTotales15, setHorasTotales15] = useState(0);

    const [horaInicio1, setHoraInicio1] = useState();
    const [horaInicio2, setHoraInicio2] = useState();
    const [horaFinal1, setHoraFinal1] = useState();
    const [horaFinal2, setHoraFinal2] = useState();

    useEffect(()=>{
        axios.post(SERVER_IP + '/api/getParteHoras', {email: user?.email, eventId: event?.id, eventDate: event?.date})
        .then((response) => { 
            if(response.data.found){
                setHoraInicio1(response.data.horaInicio1);
                setHoraInicio2(response.data.horaInicio2);
                setHoraFinal1(response.data.horaFinal1);
                setHoraFinal2(response.data.horaFinal2);
                
                const session1 = getWorkHours(response.data.horaInicio1, response.data.horaFinal1);

                if(response.data.horaInicio2){
                    const session2 = getWorkHours(response.data.horaInicio2, response.data.horaFinal2);
                    setHorasTotales(session1.horas + session2.horas);
                    setHorasTotales15(session1.horas15 + session2.horas15);
                }else{
                    setHorasTotales(session1.horas);
                    setHorasTotales15(session1.horas15);
                }   
            }
            
         })
        .catch(error => {console.log(error.message); Alert.alert("Server error:", "Error al buscar eventos")})
        .finally(() => {setLoading(false)});
    }, [])

    useEffect(() => {
        if (saved) {
            const timeout = setTimeout(() => { setSaved(false); }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [saved]);

    function getWorkHours(start: any, end: any){

        const startDate = new Date("2000-01-01T" + start + ":00");
        const endDate = new Date("2000-01-01T" + end + ":00");

        const startTime = startDate.getHours() * 60 + startDate.getMinutes();
        const endTime = endDate.getHours() * 60 + endDate.getMinutes();

        const timeDifference = endTime - startTime;

        const eventDate = new Date(event?.date as string);

        let horas15 = 0;

        if(eventDate.getDay() === 0){ // Es domingo (*1.5)
            horas15 = timeDifference * 1.5;
        }else{

            const regularStartTime = 9 * 60;
            const regularEndTime = 21 * 60;
       
            for (let i = 0; i < timeDifference; i++) {
                horas15 += (startTime + i) < regularStartTime || (endTime - i) > regularEndTime ? 1.5 : 1;
            }
        }

        return({horas: Number((timeDifference/60).toFixed(2)), horas15: Number((horas15/60).toFixed(2))});
    }

    function saveHours(horas: number, horas15: number){
        setHorasTotales(horas);
        setHorasTotales15(horas15);
        axios.post(SERVER_IP + '/api/setParteHoras', {email: user?.email, eventId: event?.id, eventDate: event?.date, horaInicio1, horaInicio2, horaFinal1, horaFinal2})
        .then((response) => { 
            setSaved(true);
        })
        .catch(error => {console.log(error.message); Alert.alert("Server error:", "Error al guardar parte de horas")});
    }

    function inputError(message: string){
        Alert.alert('Error:', message);
    }

    const onSaveButtonPressed = () => {

        setSaving(true);

        if((horaInicio1 && !horaFinal1) || (horaInicio2 && !horaFinal2) || (!horaInicio1 && horaFinal1) || (!horaInicio2 && horaFinal2)){
            inputError('Debes rellenar tanto la hora de inicio como la final!');
        }else if((horaInicio1 && horaFinal1 && horaInicio1 >= horaFinal1) || (horaInicio2 && horaFinal2 && horaInicio2 >= horaFinal2)){
            inputError('La hora de inicio no puede ser posterior o igual que la final!');
        }else if(horaFinal1 && horaInicio2 && horaFinal1 > horaInicio2) {
            inputError('La hora de inicio de la segunda sesion no puede ser anterior a la hora final de la primera sesion!');
        }else if(!horaInicio1){

            horaInicio2 ? 
            inputError('Debes rellenar la primera sesion antes de la segunda!')
            : saveHours(0, 0);
        
        }else {
            const session1 = getWorkHours(horaInicio1, horaFinal1);

            if(horaInicio2){
                const session2 = getWorkHours(horaInicio2, horaFinal2);
                saveHours(session1.horas + session2.horas, session1.horas15 + session2.horas15);
            }else{
                saveHours(session1.horas, session1.horas15);
            }    
        }

        setSaving(false);
        
    }

    return(
        <CustomTab loading={loading} title={locale.parts.hours.tabTitle} event={event}>

            <CustomTimePicker 
                session={'1*:'} 
                start={horaInicio1} 
                setStart={setHoraInicio1}
                end={horaFinal1}  
                setEnd={setHoraFinal1}  
            />

            <CustomTimePicker 
                session={'2:'} 
                start={horaInicio2} 
                setStart={setHoraInicio2}
                end={horaFinal2}  
                setEnd={setHoraFinal2}  
            />
            

            <View style={{flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginBottom: 10
            }}>

                <CustomButton onPress={onSaveButtonPressed} text={locale.parts.hours.save} backgroundColor={COLORS.appThemeColor} loading={saving}/>

                <View style={{marginLeft: 15}}>
                    <Text style={{fontSize: 16}}><Text style={{fontWeight: 'bold'}}>{locale.parts.hours.total}</Text>{horasTotales}</Text>
                    <Text style={{fontSize: 16, color: COLORS.appThemeColor}} onPress={()=>Alert.alert(locale.parts.hours.total15, locale.parts.hours.total15Desc)}><Text style={{fontWeight: 'bold'}}>{locale.parts.hours.total15}</Text>{horasTotales15}*</Text>
                </View>

            </View>

            {saved && <Text style={{color: COLORS.appThemeColor, fontSize: 16, alignSelf: 'center', paddingVertical: 5}}>
                {locale.parts.hours.saveFeedback}
            </Text>}
                
        </CustomTab>
    )
}