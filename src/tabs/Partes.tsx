
import { ActivityIndicator, Alert, StatusBar } from "react-native";
import { useEffect, useState } from "react";
import { LocaleConfig } from 'react-native-calendars';
import { useFocusEffect } from "@react-navigation/native";

import { SERVER_IP } from "@env";

import axios from "axios";

import { useUserContext } from "../ts/context";

import ExpandableCalendarScreen from "./customCalendar/ExpandableCalendarScreen";


LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago.','Sep.','Oct.','Nov.','Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.']
};
LocaleConfig.defaultLocale = 'es';


export default function Partes(){

    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    const {user} = useUserContext();

    useFocusEffect(()=>{
        if(!loading){
            StatusBar.setBackgroundColor('white');
        }
    })

    useEffect(()=>{
        axios.post(SERVER_IP + '/api/getEventsOfMonth', {email: user?.email, initial: true})
        .then((response) => { groupEventsByDate(response.data); })
        .catch(error => {console.log(error.message); Alert.alert("Server error:", "Error getting events")})
        .finally(() => {setLoading(false); StatusBar.setBackgroundColor('white');})
    }, [])

    function groupEventsByDate(events:any) {
        const eventsByDate:any = [];
    
        events.forEach((event:any) => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            const eventData = { id: event.id, title: event.title }

            if(startDate === endDate){
                eventsByDate.push({ title: startDate.toISOString().split('T')[0], data: [eventData] });
            }
            
            for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
                const formatedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
                const existingDateIndex = eventsByDate.findIndex((event:any) => event.title === formatedDate);
                
                if (existingDateIndex === -1) {
                    eventsByDate.push({ title: formatedDate, data: [eventData] });
                } else {
                    eventsByDate[existingDateIndex].data.push(eventData);
                }

            }
        });

        eventsByDate.sort((a:any, b:any) => {
            return new Date(a.title).getTime() - new Date(b.title).getTime();
        });

        setEvents(eventsByDate);
    }

    return(<>
        { loading ? <ActivityIndicator style={{paddingTop: 150}} size="large" /> 
        : <ExpandableCalendarScreen initialEvents={events} /> }
    </>);

}
