const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  status: { type: String, enum: ['Aberto', 'Em andamento', 'Resolvido'], default: 'Aberto' },
  prioridade: { type: String, enum: ['Baixa', 'Média', 'Alta'], default: 'Média' },
  criadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  atribuidoPara: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  historico: [
    {
      mensagem: String,
      autor: String,
      data: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
