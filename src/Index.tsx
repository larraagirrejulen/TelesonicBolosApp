
import React, { useEffect, useState } from 'react';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';

import { SCOPE, WEB_CLIENT_ID } from '@env';
import { UserContext } from 'contexts/userContext';
 
import LogIn from 'components/LogIn';
import TabBar from 'components/TabBar';


export default function App() {

  const [user, setUser] = useState<User['user'] | undefined>(undefined);

  const [initializingApp, setInitializingApp] = useState(true);

  useEffect(()=>{

    GoogleSignin.configure({ 
      scopes: [SCOPE],
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true
    }); 

    GoogleSignin.signInSilently()
    .then(userInfo => userInfo && setUser(userInfo.user))
    .catch(error => console.log("Silent signIn error: " + error.message))
    .finally(() => setInitializingApp(false));
    
  }, []);

  return ( initializingApp ? <></> :
    <UserContext.Provider value={{user, setUser}}>
      {user ? <TabBar/> : <LogIn/>} 
    </UserContext.Provider>
  );
   
}

