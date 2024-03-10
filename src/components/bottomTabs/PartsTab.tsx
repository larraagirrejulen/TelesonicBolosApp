
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EventContext, EventType } from 'contexts/eventContext';

import CustomBackground from 'customWidgets/CustomBackground';

import ExpandableCalendarScreen from "./partsTabComponents/calendar/ExpandableCalendarScreen";
import TopTabBar from './partsTabComponents/event/TopTabBar';


const Stack = createNativeStackNavigator();

export default function PartsTab(){

    const [event, setEvent] = useState<EventType | undefined>(undefined);

    return(
        <EventContext.Provider value={{event, setEvent}}>
            <Stack.Navigator initialRouteName="Calendar">
                <Stack.Screen options={({route}:any) => ({ title: route.params.title, headerTitleStyle: {fontSize:16}})} name="TopTabBar" component={TopTabBar} />
                <Stack.Screen options={{headerShown: false}} name="Calendar" component={CalendarOfEvents} />
            </Stack.Navigator>
        </EventContext.Provider>
    );

}

function CalendarOfEvents({navigation}:any){

    return(
        <CustomBackground>
            <ExpandableCalendarScreen navigation={navigation} />
        </CustomBackground>
    )

}
