const express = require('express');
const app = express();

app.use(express.json());

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


// ข้อมูลตั้งต้นของคำร้องแจ้งปัญหาห้องน้ำตึก A (เก็บในหน่วยความจำ)
let reports = [
  { id: 1, title: 'ชักโครกกดน้ำไม่ลง', location: 'ห้องน้ำชาย ชั้น 1', status: 'pending' },
  { id: 2, title: 'ก๊อกน้ำอ่างล้างมือชำรุด', location: 'ห้องน้ำหญิง ชั้น 2', status: 'done' },
];
let nextId = 3;


// R: ดูคำร้องแจ้งปัญหาห้องน้ำทั้งหมด
app.get('/reports', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(reports.filter((r) => r.status === status));
  }
  res.json(reports);
});

// R: ดูคำร้องแจ้งปัญหา 1 รายการ
app.get('/reports/:id', (req, res) => {
  const id = Number(req.params.id);
  const report = reports.find((r) => r.id === id);
  if (!report) {
    return res.status(404).json({ message: 'ไม่พบรายการแจ้งปัญหา' });
  }
  res.json(report);
});

// C: เพิ่มคำร้องแจ้งปัญหาห้องน้ำ
app.post('/reports', (req, res) => {
  const { title, location } = req.body;

  if (!title || !location) {
    return res.status(400).json({
      message: 'กรุณาระบุรายละเอียดปัญหาและสถานที่'
    });
  }

  const report = {
    id: nextId++,
    title,
    location,
    status: 'pending'
  };

  reports.push(report);
  res.status(201).json(report);
});

// U: แก้ไขคำร้องแจ้งปัญหาห้องน้ำ
app.put('/reports/:id', (req, res) => {
  const id = Number(req.params.id);
  const report = reports.find((r) => r.id === id);

  if (!report) {
    return res.status(404).json({
      message: 'ไม่พบคำร้องแจ้งปัญหา'
    });
  }

  const allowed = ['pending', 'doing', 'done'];

  if (req.body.status && !allowed.includes(req.body.status)) {
    return res.status(400).json({
      message: 'status ต้องเป็น pending, doing หรือ done'
    });
  }

  report.title = req.body.title ?? report.title;
  report.location = req.body.location ?? report.location;
  report.status = req.body.status ?? report.status;

  res.json(report);
});

// D: ลบ
app.delete('/reports/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = reports.findIndex((r) => r.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'ไม่พบรายการแจ้งปัญหา' });
  }
  reports.splice(index, 1);
  res.status(204).send();
});
 
// ไม่ตรงกับ route ใดเลย
app.use((req, res) => {
  res.status(404).json({ message: `ไม่มี ${req.method} ${req.path} ในระบบ` });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
