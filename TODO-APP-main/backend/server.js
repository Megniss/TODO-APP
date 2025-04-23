const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://a231529em:Tomsona30@cluster0.e0wmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('✅ MongoDB pieslēgts')).catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Sveiki! Serveris darbojas!');
});

app.listen(PORT, () => console.log(`🚀 Serveris darbojas: http://localhost:${PORT}`));
