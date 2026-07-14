const express = require('express');
const app = express();

app.post('/voice', (req, res) => {
  res.type('text/xml');
  res.send(`
    <Response>
      <Say>Welcome to Offline AI. Please speak after the beep.</Say>
      <Record maxLength="10" action="/handle-recording" playBeep="true" />
    </Response>
  `);
});

app.post('/handle-recording', (req, res) => {
  const recordingUrl = req.body.RecordingUrl;
  console.log('Recording available at:', recordingUrl);

  res.type('text/xml');
  res.send(`
    <Response>
      <Say>Thank you. Your message has been recorded.</Say>
    </Response>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));