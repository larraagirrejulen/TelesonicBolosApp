
import React, { useEffect, useState } from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import Login from "./Login.tsx";
import Menu from './Menu.tsx';
import SplashScreen from 'react-native-splash-screen';


export default function App(): React.JSX.Element {

  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();

  function onAuthStateChanged(user:any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(()=>{
    
    GoogleSignin.configure({ 
      scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
      webClientId: '879832534929-8k69u2oqehtv2rdup5ebqv4ls492l8vv.apps.googleusercontent.com'
    }); 

    auth().onAuthStateChanged(onAuthStateChanged);

    SplashScreen.hide();

  }, []);

  return (initializing ? <></> : (user ? <Menu user={user}/> : <Login/> ))
  
}

