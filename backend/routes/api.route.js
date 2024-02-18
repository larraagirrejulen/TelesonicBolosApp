const router = require('express').Router();
const {google} = require('googleapis');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server.db');
db.run("CREATE TABLE IF NOT EXISTS tokens (email TEXT PRIMARY KEY, refresh_token TEXT)");
db.run("CREATE TABLE IF NOT EXISTS partesHoras (email TEXT, eventId TEXT, eventDate TEXT, horaInicio1, horaInicio2, horaFinal1, horaFinal2, PRIMARY KEY(email, eventId, eventDate))");

const oauth2Client = new google.auth.OAuth2(
  process.env.WEB_CLIENT_ID,
  process.env.WEB_CLIENT_SECRET,
  'http://localhost:3000'
)


router.post('/signIn', async (req, res, next) => {
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
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const startOfMonth = new Date(year, month - 4);
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


router.post('/getParteHoras', async (req, res, next) => {
  try{

    const email = req.body.email;
    const eventId = req.body.eventId;
    const eventDate = req.body.eventDate;

    db.get("SELECT * FROM partesHoras WHERE email = ? AND eventId = ? AND eventDate = ?", [email, eventId, eventDate], async (err, row) => {

      if(!row){
        res.send({found: false});
      }else{
        res.send({
          found: true, 
          horaInicio1: row.horaInicio1,
          horaInicio2: row.horaInicio2,
          horaFinal1: row.horaFinal1,
          horaFinal2: row.horaFinal2,
        })
      }
  
    });

  }catch(error){
    next(error)
  }
})

router.post('/setParteHoras', async (req, res, next) => {
  try{

    const email = req.body.email;
    const eventId = req.body.eventId;
    const eventDate = req.body.eventDate;
    const horaInicio1 = req.body.horaInicio1;
    const horaInicio2 = req.body.horaInicio2;
    const horaFinal1 = req.body.horaFinal1;
    const horaFinal2 = req.body.horaFinal2;

    db.get("SELECT email FROM partesHoras WHERE email = ? AND eventId = ? AND eventDate = ?", [email, eventId, eventDate], async (err, row) => {
        
      if(!row) {
        if(horaInicio1){
          db.serialize(() => {
            const stmt = db.prepare("INSERT INTO partesHoras (email, eventId, eventDate, horaInicio1, horaInicio2, horaFinal1, horaFinal2) VALUES (?, ?, ?, ?, ?, ?, ?)");
            stmt.run(email, eventId, eventDate, horaInicio1, horaInicio2, horaFinal1, horaFinal2);
            stmt.finalize();
          });
        }
        
      } else {
        if(horaInicio1){
          db.run("UPDATE partesHoras SET horaInicio1 = ?, horaInicio2 = ?, horaFinal1 = ?, horaFinal2 = ? WHERE email = ? AND eventId = ? AND eventDate = ?", [horaInicio1, horaInicio2, horaFinal1, horaFinal2, email, eventId, eventDate], (updateErr) => {
            if (updateErr) {
              // Handle update error
              console.error("Error updating parte de horas:", updateErr);
            } else {
              // Refresh token updated successfully
              console.log("Parte de horas updated successfully");
            }
          });
        }else{
          db.run("DELETE FROM partesHoras WHERE email = ? AND eventId = ? AND eventDate = ?", [email, eventId, eventDate], (updateErr) => {
            if (updateErr) {
              // Handle update error
              console.error("Error updating parte de horas:", updateErr);
            } else {
              // Refresh token updated successfully
              console.log("Parte de horas updated successfully");
            }
          });
        }
        
      }

      res.send('ok');
    });

  }catch(error){
    next(error)
  }
})


module.exports = router;


