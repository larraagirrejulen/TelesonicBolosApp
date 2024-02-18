
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import { EventContext, EventType } from 'src/contexts/eventContext';
import ExpandableCalendarScreen from "tabs/partes/calendario/ExpandableCalendarScreen";
import Event from 'tabs/partes/partesEvento/Event';

const Stack = createNativeStackNavigator();

export default function Partes(){

    const [event, setEvent] = useState<EventType | undefined>(undefined);

    return(
        <EventContext.Provider value={{event, setEvent}}>
            <Stack.Navigator initialRouteName="Calendar">
                <Stack.Screen options={({route}:any) => ({ title: route.params.title, headerTitleStyle: {fontSize:16}})} name="Event" component={Event} />
                <Stack.Screen options={{headerShown: false}} name="Calendar" component={ExpandableCalendarScreen} />
            </Stack.Navigator>
        </EventContext.Provider>
    );

}


