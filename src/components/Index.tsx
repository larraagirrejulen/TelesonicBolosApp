
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import { UserContext } from 'contexts/userContext';
import { LocaleContext } from 'contexts/localeContext';

import LogIn from 'components/LogIn';
import BottomTabBar from 'components/BottomTabBar';

import { SCOPE, WEB_CLIENT_ID } from '@env';
import LOCALES from 'config/locales';



export default function App() {

  const [user, setUser] = useState<User['user'] | undefined>(undefined);
  const [locale, setLocale] = useState(LOCALES['es']);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{

    GoogleSignin.configure({ 
      scopes: [SCOPE],
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true
    }); 

    GoogleSignin.signInSilently()
    .then(userInfo => userInfo && setUser(userInfo.user))
    .catch(error => console.log("Silent signIn error: " + error.message))
    .finally(async() => {
      const storedLanguage = await AsyncStorage.getItem('language');
      storedLanguage === 'eus' && setLocale(LOCALES['eus']);
      setLoading(false);
    });
    
  }, []);


  return ( loading ? <></> :
    <LocaleContext.Provider value={{locale, setLocale}}>
      <UserContext.Provider value={{user, setUser}}>
        {user ? 
          <BottomTabBar/>
        : 
          <LogIn/>
        } 
      </UserContext.Provider>
    </LocaleContext.Provider>
  );
   
}

