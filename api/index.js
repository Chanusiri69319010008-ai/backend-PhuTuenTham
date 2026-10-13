<<<<<<< HEAD
const express = require('express');
const  app = express();
=======

const express = require('express');
const app = express();
>>>>>>> dccb3c5 (Add Express API endpoints)

app.get('/hello', (req, res) => {
    res.json({ message: 'สวัสดี Back-End!' });
});

<<<<<<< HEAD
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
=======
const member = [
    { id: 1, name: 'ปนิตา งอกชัยภูมิ', std_id: 018 },
    { id: 2, name: 'ชนันสิริ กุลนิษฐ์', std_id: 008 }
];

app.get('/members', (req, res) => {
    res.json(member);
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
>>>>>>> dccb3c5 (Add Express API endpoints)
