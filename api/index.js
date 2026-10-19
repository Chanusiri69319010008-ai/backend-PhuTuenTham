
const express = require('express');
const app = express();

app.use(express.json());



app.get('/hello', (req, res) => {
  res.json({ message: 'สวัสดี Back-End!' });
});


const members = [
  { id: 1, name: 'ปนิตา งอกชัยภูมิ', role: 'Dev B' },
  { id: 2, name: 'ชนันสิริ กุลนิษฐ์', role: 'Dev A' }
];

const project = {
  team: 'ผู้ตื่นธรรม',
  topic: 'ระบบแจ้งปัญหาห้องน้ำตึก A',
  problem: 'ห้องน้ำชำรุด ไม่ได้รับการแก้ไข หรือได้รับการแก้ไขล่าช้า',
  users: ['นักเรียน/นักศึกษา', 'เจ้าหน้าที่อาคารสถานที่'],
  members
};

app.get('/project', (req, res) => {
  res.json(project);
});

app.get('/members', (req, res) => {
  res.json(members);
});

app.get('/members/:id', (req, res) => {
  const id = Number(req.params.id);
  const member = members.find((m) => m.id === id);

  if (!Number.isInteger(id) || !member) {
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


let users = [
  {
    id: 1,
    name: 'ภริตา งามหน้า',
    departments: 'เทคโนโลยีสารสนเทศ',
    level: '2'
  },
  {
    id: 2,
    name: 'ลิลา จันทร์สวัสดิ์',
    departments: 'เทคนิคคอมพิวเตอร์',
    level: '3'
  }
];

let nextId = 3;

function findUserById(id) {
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return users.find((u) => u.id === id) || null;
}

app.get('/users', (req, res) => {
  const { name } = req.query;

  if (name !== undefined) {
    return res.json(users.filter((u) => u.name === name));
  }

  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' });
  }

  res.json(user);
});

app.post('/users', (req, res) => {
  const { name, departments, level } = req.body;

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof departments !== 'string' || !departments.trim() ||
    level === undefined || level === null || String(level).trim() === ''
  ) {
    return res.status(400).json({
      message: 'ต้องส่ง name, departments และ level ให้ครบ'
    });
  }

  const user = {
    id: nextId++,
    name: name.trim(),
    departments: departments.trim(),
    level: String(level)
  };

  users.push(user);

  res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' });
  }

  const { name, departments, level } = req.body;

  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'name ต้องเป็นข้อความที่ไม่ว่าง' });
    }
    user.name = name.trim();
  }

  if (departments !== undefined) {
    if (typeof departments !== 'string' || !departments.trim()) {
      return res.status(400).json({
        message: 'departments ต้องเป็นข้อความที่ไม่ว่าง'
      });
    }
    user.departments = departments.trim();
  }

  if (level !== undefined) {
    if (level === null || String(level).trim() === '') {
      return res.status(400).json({ message: 'level ห้ามเป็นค่าว่าง' });
    }
    user.level = String(level);
  }

  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (!Number.isInteger(id) || index === -1) {
    return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' });
  }

  users.splice(index, 1);

  res.status(204).send();
});


let reports = [
  { id: 1, title: 'ชักโครกกดน้ำไม่ลง', location: 'ห้องน้ำชาย ชั้น 1', status: 'pending' },
  { id: 2, title: 'ก๊อกน้ำอ่างล้างมือชำรุด', location: 'ห้องน้ำหญิง ชั้น 2', status: 'done' },
];
let nextId = 3;


app.get('/reports', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(reports.filter((r) => r.status === status));
  }
  res.json(reports);
});

app.get('/reports/:id', (req, res) => {
  const id = Number(req.params.id);
  const report = reports.find((r) => r.id === id);
  if (!report) {
    return res.status(404).json({ message: 'ไม่พบรายการแจ้งปัญหา' });
  }
  res.json(report);
});

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

app.delete('/reports/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = reports.findIndex((r) => r.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'ไม่พบรายการแจ้งปัญหา' });
  }
  reports.splice(index, 1);
  res.status(204).send();
});
 
app.use((req, res) => {
  res.status(404).json({ message: `ไม่มี ${req.method} ${req.path} ในระบบ` });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
