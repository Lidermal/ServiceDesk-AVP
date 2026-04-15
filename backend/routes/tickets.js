const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Criar chamado
router.post('/', async (req, res) => {
  const ticket = new Ticket(req.body);
  await ticket.save();
  res.json(ticket);
});

// Listar chamados
router.get('/', async (req, res) => {
  const tickets = await Ticket.find().populate('criadoPor').populate('atribuidoPara');
  res.json(tickets);
});

// Atualizar chamado (atribuir, mudar status, adicionar histórico)
router.put('/:id', async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ticket);
});

module.exports = router;
