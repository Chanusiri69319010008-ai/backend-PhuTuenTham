const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.json({ message: 'สวัสดี Back-End!' });
});

const members = [
    { id: 1, name: 'ปนิตา งอกชัยภูมิ', role: 'Dev B' },
    { id: 2, name: 'ชนันสิริ กุลนิษฐ์', role: 'Dev A' },
];

const project = {
    team: 'ผู้ตื่นธรรม',
    topic: 'ระบบแจ้งปัญหาห้องน้ำตึก A',
    problem: 'ห้องน้ำชำรุด ไม่ได้รับการแก้ไข หรือได้รับการแก้ไขที่ล่าช้า',
    users: ['student1', 'student2'],
    members: members,
};
app.get('/project', (req, res) => {
  res.json(project);
});


app.get('/members/:id', (req, res) => {
    const id = Number(req.params.id);
    const member = members.find((m) => m.id === id);

    if (!member) {
        return res.status(404).json({
            message: 'Member not found'
        });
    }

    res.json(member);
});

app.get('/ideas', (req, res) => {
    const ideas = [
        {
            method: 'POST',
            path: '/send_reports',
            detail: 'ใช้ส่งคำร้องไปยังเจ้าหน้าที่'
        },
        {
            method: 'GET',
            path: '/reports',
            detail: 'ดูคำร้อง'
        },
        {
            method: 'DELETE',
            path: '/delete_reports',
            detail: 'ลบคำร้อง'
        }
    ];

    res.json(ideas);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
