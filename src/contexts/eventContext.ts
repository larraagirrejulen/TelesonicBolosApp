

import React, { createContext, useContext } from "react";

export type EventType = {
    id: string,
    title: string,
    date: string
}

type EventContextType = {
    event: EventType | undefined,
    setEvent: React.Dispatch<React.SetStateAction<EventType | undefined>>
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

export function useEventContext() {

    const eventContext = useContext(EventContext);

    if(eventContext === undefined){
        throw new Error("useEventContext must be used with a EventContext.Provider")
    }

    return eventContext;
    
}