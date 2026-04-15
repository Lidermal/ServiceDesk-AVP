const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  nivel: { type: String, enum: ['Suporte', 'Desenvolvedor'] }
});

module.exports = mongoose.model('User', UserSchema);
