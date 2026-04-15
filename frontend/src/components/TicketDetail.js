import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TicketDetail({ id }) {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`https://helpdesk.avpconecta.com.br/api/tickets/${id}`).then(res => setTicket(res.data));
  }, [id]);

  const atribuirChamado = async (userId) => {
    await axios.put(`https://helpdesk.avpconecta.com.br/api/tickets/${id}`, { atribuidoPara: userId, status: 'Em andamento' });
    const updated = await axios.get(`https://helpdesk.avpconecta.com.br/api/tickets/${id}`);
    setTicket(updated.data);
  };

  if (!ticket) return <p>Carregando...</p>;

  return (
    <div>
      <h3>{ticket.titulo}</h3>
      <p>{ticket.descricao}</p>
      <p>Status: {ticket.status}</p>
      <button onClick={() => atribuirChamado('ID_DO_DESENVOLVEDOR')}>Assumir Chamado</button>
    </div>
  );
}

export default TicketDetail;
