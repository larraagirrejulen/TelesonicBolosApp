const router = require('express').Router();
const {google} = require('googleapis');
const axios = require('axios');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server.db');
db.run("CREATE TABLE IF NOT EXISTS tokens (email TEXT PRIMARY KEY, refresh_token TEXT)");

const oauth2Client = new google.auth.OAuth2(
  process.env.WEB_CLIENT_ID,
  process.env.WEB_CLIENT_SECRET,
  'http://localhost:3000'
)


router.post('/getUserTokens', async (req, res, next) => {
  try{
    const code = req.body.serverAuthCode
    const email = req.body.email

    const response = await oauth2Client.getToken(code)
    const refresh_token = response.tokens.refresh_token;
    
    if(refresh_token){

      db.get("SELECT email FROM tokens WHERE email = ?", [email], async (err, row) => {
        
        if(!row) {
          db.serialize(() => {
            const stmt = db.prepare("INSERT INTO tokens (email, refresh_token) VALUES (?, ?)");
            stmt.run(email, refresh_token);
            stmt.finalize();
          });
        } else {
          db.run("UPDATE tokens SET refresh_token = ? WHERE email = ?", [refresh_token, email], (updateErr) => {
            if (updateErr) {
              // Handle update error
              console.error("Error updating refresh token:", updateErr);
            } else {
              // Refresh token updated successfully
              console.log("Refresh token updated successfully");
            }
          });
        }
      });
    
    }

    res.send('ok')

  }catch(error){
    next(error)
  }
})


router.post('/getEventsOfMonth', async (req, res, next) => {
  try{

    const email = req.body.email
    const initialEvents = req.body.initial === true
    let year = req.body.year
    let month = req.body.month

    if (initialEvents) {
      const currentDate = new Date();
      year = currentDate.getFullYear();
      month = currentDate.getMonth();
    } 

    const startOfMonth = new Date(initialEvents ? month - 1 : month);
    const endOfMonth = new Date(year, month + 1);

    db.get("SELECT refresh_token FROM tokens WHERE email = ?", [email], async (err, row) => {

      oauth2Client.setCredentials({refresh_token: row.refresh_token})
  
      const calendar = google.calendar("v3")
  
      const response = await calendar.events.list({ 
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: startOfMonth,
        timeMax: endOfMonth,
      })
  
      // Obtener solo los IDs, fechas de inicio y fin de los eventos
      const eventsData = response.data.items.map((event) => ({
        id: event.id,
        title: event.summary,
        codigo: event.displayName,
        startDate: event.start.dateTime || event.start.date,
        endDate: event.end.dateTime || event.end.date,
      }));
  
      res.send(eventsData)
  
    });

  }catch(error){
    next(error)
  }
})

module.exports = router;


