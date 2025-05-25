const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE_PATH = './messages.json';

// 메시지 저장 API
app.post('/messages', (req, res) => {
  const newMessage = req.body;

  let messages = [];
  if (fs.existsSync(FILE_PATH)) {
    messages = JSON.parse(fs.readFileSync(FILE_PATH));
  }

  messages.push(newMessage);
  fs.writeFileSync(FILE_PATH, JSON.stringify(messages, null, 2));
  res.status(200).json({ success: true });
});

// 메시지 불러오기 API
app.get('/messages', (req, res) => {
  if (fs.existsSync(FILE_PATH)) {
    const messages = JSON.parse(fs.readFileSync(FILE_PATH));
    res.json(messages);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
