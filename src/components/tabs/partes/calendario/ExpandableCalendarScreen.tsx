
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StatusBar, StyleSheet} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, LocaleConfig} from 'react-native-calendars';
import AgendaItem from 'src/components/tabs/partes/calendario/AgendaItem';
import { useUserContext } from 'src/contexts/userContext';
import axios from 'axios';
import CustomBackground from 'tabs/CustomBackground';
import { useFocusEffect } from '@react-navigation/native';
import { SERVER_IP } from '@env';
import COLORS from 'src/constants/colors';
import LOCALES from 'src/constants/locales';

LocaleConfig.locales['es'] = LOCALES.calendar.es;
LocaleConfig.locales['eus'] = LOCALES.calendar.eus;
LocaleConfig.defaultLocale = 'es';

export default function ExpandableCalendarScreen ({navigation}:any) {

  const [initializingCalendar, setInitializingCalendar] = useState(true);
  const [updatingWeekEvents, setUpdatingWeekEvents] = useState(false);

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [weekEvents, setWeekEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [dateMarks, setDateMarks] = useState({});

  const {user} = useUserContext();

  useFocusEffect(()=>{
      if(!initializingCalendar){
          StatusBar.setBackgroundColor('white');
      }
  })

  useEffect(()=>{
      axios.post(SERVER_IP + '/api/getEventsOfMonth', {email: user?.email})
      .then((response) => { groupEventsByDate(response.data); })
      .catch(error => {console.log(error.message); Alert.alert("Server error:", "Error getting events")})
      .finally(() => {setInitializingCalendar(false); StatusBar.setBackgroundColor('white');})
  }, [])

  
  type event = {
    id: string,
    title: string,
    codigo: string,
    startDate: string,
    endDate: string,
  }

  const groupEventsByDate = (events:any) => {
      
      const eventsByDate:any = [];
  
      events.forEach((event: event) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          const eventData = { id: event.id, title: event.title, date: ''}

          if(startDate === endDate){
              eventData['date'] = startDate.toISOString().split('T')[0];
              eventsByDate.push({ title: startDate.toISOString().split('T')[0], data: [eventData] });
          }
          
          for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
              const formatedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
              const existingDateIndex = eventsByDate.findIndex((dateEvent:any) => dateEvent.title === formatedDate);
              eventData['date'] = formatedDate;

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

      const startDate = new Date(eventsByDate[0].title);
      const endDate = new Date(eventsByDate[eventsByDate.length-1].title);
      const marks:any = {}

      if(startDate === endDate){
          marks[eventsByDate[0].title] = {marked: true, disabled: false};
      }

      for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
          const dateStr = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
          const existingDateIndex = eventsByDate.findIndex((event:any) => event.title === dateStr);
          marks[dateStr] = existingDateIndex === -1 ? {disabled: true} : {marked: true, disabled: false, selected: false};
      }
      setDateMarks(marks);
  }

  useEffect(()=>{

    const dayOfWeek = selectedDate.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6
    const startOfWeek = new Date(selectedDate);
    const endOfWeek = new Date(selectedDate);
    
    // Adjust the date for the start of the week
    startOfWeek.setDate(selectedDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // If Sunday, subtract 6 days; otherwise, subtract the difference from Monday
    // Adjust the date for the end of the week
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get to the end of the week

    setWeekEvents(events.filter((event:any) => {
      const eventDate = new Date(event.title);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }));

    setUpdatingWeekEvents(false);

  }, [events, selectedDate])

  return (
    <CustomBackground>{initializingCalendar ? <ActivityIndicator style={{paddingTop: 150}} size="large" /> : 
      
      <CalendarProvider
        date={currentDateString}
        onDateChanged={date=>{setUpdatingWeekEvents(true); setSelectedDate(new Date(date))}}
      >

        <ExpandableCalendar
          hideArrows={updatingWeekEvents ? true : false}
          disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={dateMarks}
          disableWeekScroll
          disablePan
          hideKnob
          style={{zIndex: 10, paddingBottom: 15}}
          theme={{
            arrowColor: COLORS.appThemeColor,
            selectedDayBackgroundColor: 'white',
            selectedDayTextColor: 'black',    
            selectedDotColor: COLORS.appThemeColor,
            dayTextColor: 'black',
            dotColor: COLORS.appThemeColor,
            todayTextColor: 'black'
          }}
        />

        {updatingWeekEvents ? <ActivityIndicator style={{paddingTop: 150}} size="large" />  : weekEvents.length > 0 &&
          <AgendaList
            style={{marginBottom: 90}}
            sections={weekEvents}
            renderItem={({item}: any) => <AgendaItem item={item} navigation={navigation} />}
            sectionStyle={styles.section}
            markToday={false}
            avoidDateUpdates
          />
        }
        
      </CalendarProvider>

    }</CustomBackground>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#414d63',
    textTransform: 'capitalize',
    left: 15,
    right: 15,
  }
});
