
import React, { useEffect, useState } from 'react';
import {Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import Login from "./Login.tsx";
import Menu from './Menu.tsx';

export default function App(this: any): React.JSX.Element {

  const [initializing, setInitializing] = useState(false);
  const [user, setUser]:any = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(()=>{
    GoogleSignin.configure({ 
      webClientId: '879832534929-8k69u2oqehtv2rdup5ebqv4ls492l8vv.apps.googleusercontent.com'
    });
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) {
    return <Text>Cargando...</Text>;
  } else {
    return ( user ? <Menu user={user}/> : <Login/> );
  }
  
}
