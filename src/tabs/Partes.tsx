import { Alert, Text, View } from "react-native";
import TabBackground from "./TabBackground";

import { useEffect, useState } from "react";

import { SERVER_IP } from "@env";
import axios from "axios";

import { useUserContext } from "../ts/context";


export default function Partes(){

    const {user} = useUserContext();

    useEffect(()=>{

        axios.post(SERVER_IP + '/api/get-events', {email: user?.email})
        .then((response) => { console.log(response.data); })
        .catch(error => {console.log(error.message); Alert.alert("Server error:", "Error getting events")})
        
    }, [])

    return(
        <TabBackground>
            <Text>Partes</Text>
        </TabBackground>
    );
}