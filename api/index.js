const express = require('express');
const  app = express();

app.get('/hello', (req, res) => {
    res.json({ message: 'สวัสดี Back-End!' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});