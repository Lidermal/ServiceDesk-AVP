const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const ticketRoutes = require('./routes/tickets');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB (use Mongo Atlas ou servidor próprio)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Rotas da API
app.use('/api/tickets', ticketRoutes);

// Servir frontend React build
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Porta definida pelo servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Service Desk AVP rodando na porta ${PORT}`);
});
