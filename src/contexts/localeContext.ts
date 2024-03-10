

import React, { createContext, useContext } from "react";


type LocaleContextType = {
    locale: any,
    setLocale: React.Dispatch<React.SetStateAction<any>>
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocaleContext() {

    const localeContext = useContext(LocaleContext);

    if(localeContext === undefined){
        throw new Error("useLanguageContext must be used with a LanguageContext.Provider")
    }

    return localeContext;
    
}