const express = require('express');
const app = express();

app.post('/voice', (req, res) => {
  res.type('text/xml');
  res.send(`
    <Response>
      <Say>Welcome to Offline AI. This is a test.</Say>
    </Response>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));