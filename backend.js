const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

const DATA_FILE = './database.json';

// Helper to load data
function loadDb() {
  if (!fs.existsSync(DATA_FILE)) return { salary: 0, tx: [] };
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Helper to save data
function saveDb(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get Data Endpoint
app.get('/api/data', (req, res) => {
  const data = loadDb();
  res.json(data);
});

// Save Data Endpoint
app.post('/api/data', (req, res) => {
  saveDb(req.body);
  res.json({ success: true, message: 'Data saved to server successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
