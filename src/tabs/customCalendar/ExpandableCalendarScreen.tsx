
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, DateData} from 'react-native-calendars';
import AgendaItem from './AgendaItem';
import { useUserContext } from '../../ts/context';
import axios from 'axios';

function getWeekStartAndEnd(date: Date) {
  const dayOfWeek = date.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6
  const startOfWeek = new Date(date);
  const endOfWeek = new Date(date);
  
  // Adjust the date for the start of the week
  startOfWeek.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // If Sunday, subtract 6 days; otherwise, subtract the difference from Monday
  
  // Adjust the date for the end of the week
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get to the end of the week
  
  return {startOfWeek, endOfWeek};
}



export default function ExpandableCalendarScreen ({initialEvents}:any) {

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [events, setEvents] = useState(initialEvents);
  const [markedDates, setMarkedDates] = useState({});
  const [weekEvents, setWeekEvents] = useState([]);

  const {user} = useUserContext();

  /*const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getFullYear()
  const [fetchedMonths, setFetchedMonths] = useState(
    {currentYear: [{month: currentMonth}]}
  );*/

  useEffect(()=>{

    const {startOfWeek, endOfWeek} = getWeekStartAndEnd(selectedDate);

    console.log(startOfWeek, endOfWeek)

    setWeekEvents(events.filter((event:any) => {
      const eventDate = new Date(event.title);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }));

  }, [selectedDate])

  useEffect(()=>{

    const startDate = new Date(events[0].title);
    const endDate = new Date(events[events.length-1].title);
    const marks:any = {}

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateStr = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const existingDateIndex = events.findIndex((event:any) => event.title === dateStr);
        marks[dateStr] = existingDateIndex === -1 ? {disabled: true} : {marked: true};
    }

    setMarkedDates(marks);

  }, [events])

  return (
    <CalendarProvider
        date={currentDateString}
        onDateChanged={date=>setSelectedDate(new Date(date))}
        onMonthChange={(date)=>
          console.log(date.month)
        }
    >

      <ExpandableCalendar
        disableAllTouchEventsForDisabledDays
        firstDay={1}
        markedDates={markedDates}
        disableWeekScroll
        disablePan
        hideKnob
        style={{zIndex: 10, paddingBottom: 15,}}
      />

      {weekEvents.length > 0 &&
        <AgendaList
          style={{marginBottom: 90}}
          sections={weekEvents}
          renderItem={({item}: any) => <AgendaItem item={item}/>}
          scrollToNextEvent
          sectionStyle={styles.section}
          markToday={true}
          avoidDateUpdates
        />
      }
      
    </CalendarProvider>
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
