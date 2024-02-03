import { Text, View } from "react-native";
import TabBackground from "./TabBackground";

import { useEffect, useState } from "react";

import {google} from 'googleapis';



const GOOGLE_CLIENT_ID = "879832534929-8k69u2oqehtv2rdup5ebqv4ls492l8vv.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = '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'
/*apiKey: "AIzaSyATCrGnSTqhkTedgCOdRDhiX4jUvTZVUpk",
scope: "https://www.googleapis.com/auth/calendar",
discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
],*/

export default function Partes(){


    useEffect(()=>{
        async ()=>{
            const oauth2Client = new google.auth.OAuth2(
                GOOGLE_CLIENT_ID,
                GOOGLE_CLIENT_SECRET
            )

            oauth2Client.setCredentials({
                access_token: 'ya29.a0AfB_byBkmoCCY39ySSGdMVxUjcAnAsowH3A8wqFysSJ-S50gwrWLtlk76cWvkhkvoLR0td-2G5UajhTEIkmm9yRdGr_ToOgsnfdihWx248G2rGniEg6MArUb60_gRud97EHlf19oZ_fB_HsmsZo_59b_NNLRXVTmNgaCgYKATsSARASFQHGX2Mi11UogmsVKfKsb6V9ClxcnQ0169'
            })

            const calendar = google.calendar("v3")
        
            const response = await calendar.events.get({
                auth: oauth2Client,
                calendarId: 'primary'
            })

            console.log(JSON.stringify(response))
        }
    }, [])

    return(
        <TabBackground>
            <Text>Partes</Text>
        </TabBackground>
    );
}