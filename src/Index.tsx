
import React, { useEffect, useState } from 'react';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';

import { SCOPE, WEB_CLIENT_ID } from '@env';
import { UserContext } from './ts/context.ts';

import LogIn from "./LogIn.tsx";
import TabBar from './TabBar.tsx';


export default function App() {

  const [user, setUser] = useState<User['user']>();

  const [initializing, setInitializing] = useState(true);

  useEffect(()=>{

    GoogleSignin.configure({ 
      scopes: [SCOPE],
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true
    }); 

    GoogleSignin.signInSilently()
    .then(userInfo => userInfo && setUser(userInfo.user))
    .catch(error => console.log("Silent signIn error: " + error.message))
    .finally(() => {setInitializing(false)})
    
  }, []);

  return ( initializing ? <></> :
    <UserContext.Provider value={{user, setUser}}>
      {user ? <TabBar/> : <LogIn/>} 
    </UserContext.Provider>
  );
   
}

