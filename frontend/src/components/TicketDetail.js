import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TicketDetail({ id }) {
  const [ticket, setTicket] = useState(null);
  const [mensagem, setMensagem] = useState('');

  // Carregar detalhes do chamado
  useEffect(() => {
    axios.get(`https://dev.avpconecta.com.br/api/chamados/${id}`)
      .then(res => setTicket(res.data));
  }, [id]);

  // Atribuir chamado para um desenvolvedor
  const atribuirChamado = async (userId) => {
    await axios.put(`https://dev.avpconecta.com.br/api/chamados/${id}`, { 
      atribuido_para: userId, 
      status: 'Em andamento' 
    });
    const updated = await axios.get(`https://dev.avpconecta.com.br/api/chamados/${id}`);
    setTicket(updated.data);
  };

  // Adicionar comentário ao histórico
  const adicionarHistorico = async () => {
    await axios.post(`https://dev.avpconecta.com.br/api/historico`, { 
      chamado_id: id, 
      mensagem, 
      autor: 'Janaelson' // exemplo, depois pode ser dinâmico
    });
    setMensagem('');
    const updated = await axios.get(`https://dev.avpconecta.com.br/api/chamados/${id}`);
    setTicket(updated.data);
  };

  if (!ticket) return <p>Carregando...</p>;

  return (
    <div>
      <h3>{ticket.titulo}</h3>
      <p>{ticket.descricao}</p>
      <p>Status: {ticket.status}</p>
      <p>Prioridade: {ticket.prioridade}</p>

      <button onClick={() => atribuirChamado(2)}>Assumir Chamado</button> 
      {/* Exemplo: atribuir para userId=2 */}

      <h4>Histórico de ações</h4>
      <ul>
        {ticket.historico && ticket.historico.map((h, index) => (
          <li key={index}>
            <strong>{h.autor}</strong>: {h.mensagem} ({new Date(h.data).toLocaleString()})
          </li>
        ))}
      </ul>

      <textarea 
        placeholder="Adicionar comentário..." 
        value={mensagem} 
        onChange={(e) => setMensagem(e.target.value)} 
      />
      <button onClick={adicionarHistorico}>Enviar comentário</button>
    </div>
  );
}

export default TicketDetail;
