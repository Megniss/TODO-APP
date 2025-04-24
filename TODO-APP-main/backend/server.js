const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');
const path       = require('path');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.use(bodyParser.json());
app.use(cors());

app.use('/tasks', taskRoutes);

mongoose.connect(
  'mongodb+srv://a231529em:Tomsona30@cluster0.e0wmv.mongodb.net/todoapp?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('✅ MongoDB pieslēgts'))
.catch(err => console.error('❌ MongoDB kļūda:', err));

app.get('*', (req, res) =>
  res.sendFile(path.join(frontendPath, 'index.html'))
);

app.listen(PORT, () => 
  console.log(`🚀 Serveris: http://localhost:${PORT}`)
);
