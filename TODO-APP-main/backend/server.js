const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const openurl = require('openurl');

const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

// MongoDB connection
mongoose.connect(
  'mongodb+srv://a231529em:Tomsona30@cluster0.e0wmv.mongodb.net/todoapp?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('✅ MongoDB savienots'))
.catch(err => console.error('❌ MongoDB kļūda:', err));

// Serve frontend
app.get('*', (req, res) =>
  res.sendFile(path.join(frontendPath, 'index.html'))
);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Serveris darbojas: http://localhost:${PORT}`);
  openurl.open(`http://localhost:${PORT}`);
});
