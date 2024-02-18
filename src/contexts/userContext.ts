
import { User } from "@react-native-google-signin/google-signin";
import React, { createContext, useContext } from "react";

type UserContextType = {
    user: User['user'] | undefined,
    setUser: React.Dispatch<React.SetStateAction<User['user'] | undefined>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext() {

    const userContext = useContext(UserContext);

    if(userContext === undefined){
        throw new Error("useUserContext must be used with a UserContext.Provider")
    }

    return userContext;
    
}