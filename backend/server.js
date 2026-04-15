const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ticketRoutes = require('./routes/tickets');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB (pode ser Atlas ou servidor próprio)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/tickets', ticketRoutes);

// Porta definida pelo servidor (Heroku, Docker, etc.)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Service Desk AVP rodando na porta ${PORT}`);
});
