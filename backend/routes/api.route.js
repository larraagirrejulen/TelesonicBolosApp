const router = require('express').Router();
const {google} = require('googleapis');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server.db');
db.run("CREATE TABLE IF NOT EXISTS tokens (email TEXT PRIMARY KEY, access_token TEXT, refresh_token TEXT)");



const oauth2Client = new google.auth.OAuth2(
  process.env.WEB_CLIENT_ID,
  process.env.WEB_CLIENT_SECRET,
  'http://localhost:3000'
)

router.post('/create-tokens', async (req, res, next) => {
  try{
    const code = req.body.serverAuthCode
    const email = req.body.email

    console.log(email)

    db.get("SELECT email FROM tokens WHERE email = ?", [email], async (err, row) => {
      if(!row) {
        const response = await oauth2Client.getToken(code)
        db.serialize(() => {
          const stmt = db.prepare("INSERT INTO tokens (email, access_token, refresh_token) VALUES (?, ?, ?)");
          stmt.run(email, response.tokens.access_token, response.tokens.refresh_token);
          stmt.finalize();
        });
      } 
      res.send("ok")
    });

  }catch(error){
    next(error)
  }
})

router.post('/get-events', async (req, res, next) => {
  try{

    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const email = req.body.email

    db.get("SELECT access_token,refresh_token FROM tokens WHERE email = ?", [email], async (err, row) => {
      
      const {access_token, refresh_token} = row;

      oauth2Client.setCredentials({access_token, refresh_token})

      const calendar = google.calendar("v3")

      const response = await calendar.events.list({ 
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: startOfMonth.toISOString(),
        timeMax: endOfMonth.toISOString()
      })

      // Obtener solo los IDs, fechas de inicio y fin de los eventos
      const eventsData = response.data.items.map((event) => ({
        id: event.id,
        startDate: event.start.dateTime || event.start.date,
        endDate: event.end.dateTime || event.end.date,
      }));

      console.log(JSON.stringify(eventsData))
      
    });

    res.send("ok")

  }catch(error){
    next(error)
  }
})

module.exports = router;


