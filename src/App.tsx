
import React, { useEffect, useState } from 'react';
import {GoogleSignin, User, statusCodes} from '@react-native-google-signin/google-signin';
import SplashScreen from 'react-native-splash-screen';

import {WEB_CLIENT_ID} from '@env';

import { UserContext } from './ts/context.ts';

import Login from "./Login.tsx";
import Menu from './Menu.tsx';


export default function App(): React.JSX.Element {

  const [user, setUser] = useState<User['user']>();

  useEffect(()=>{
    
    GoogleSignin.configure({ 
      scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true
    }); 

    GoogleSignin.signInSilently()
    .then((userInfo) => { userInfo && setUser(userInfo.user); })
    .catch( (error: any) => {
      console.log(error.code === statusCodes.SIGN_IN_REQUIRED ? 
        "User needs to sign in" 
      : 
        "Silent signIn error: " + error.message
      );
    }).finally(() => { user === undefined && SplashScreen.hide(); });
    
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {user ? <Menu/> : <Login/>} 
    </UserContext.Provider>
  );
   
}

