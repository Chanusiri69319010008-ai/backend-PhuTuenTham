
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.json({ message: 'สวัสดี Back-End!' });
});
//GET /project

const members = [
  { id: 1, name: 'น.ส.ชนันสิริ กุลนิษฐ์', role: 'Developer A (API และโค้ดฝั่ง Server)' },
  { id: 2, name: 'น.ส.ปนิตา งอกชัยภูมิ', role: 'Developer B (ฐานข้อมูล ทดสอบ เอกสาร)' },
];

const project = {
  team: 'ผู้ตื่นธรรม',
  topic: 'ระบบแจ้งปัญหาห้องน้ำตึก  A',
  problem: 'ห้องน้ำชำรุด ไม่ได้รับการแก้ไข หรือได้รับการแก้ไขล่าช้า',
  users: ['นักเรียน/นักศึกษา', 'เจ้าหน้าที่อาคารสถานที่'],
  members: members,
};

app.get('/project', (req, res) => {
  res.json(project);
});

app.get('/members/:id', (req, res) => {
  const id = Number(req.params.id);
  const member = members.find((m) => m.id === id);

  if (!member) {
    return res.status(404).json({ message: 'ไม่พบข้อมูลสมาชิก' });
  }

  res.json(member);
});

const ideas = [
  {
    method: 'POST',
    path: '/send_reports',
    detail: 'ส่งคำร้องไปยังเจ้าหน้าที่'
  },
  {
    method: 'GET',
    path: '/reports',
    detail: 'ดูรายงานคำร้อง'
  },
  {
    method: 'DELETE',
    path: '/delete_reports',
    detail: 'ลบคำร้อง'
  }
];

app.get('/ideas', (req, res) => {
  res.json(ideas);
});

const member = [
    { id: 1, name: 'ปนิตา งอกชัยภูมิ', std_id: '018' },
    { id: 2, name: 'ชนันสิริ กุลนิษฐ์', std_id: '008' }
];

app.get('/members', (req, res) => {
    res.json(member);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
