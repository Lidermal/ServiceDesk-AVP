import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('https://dev.avpconecta.com.br/api/chamados').then(res => setTickets(res.data));
  }, []);

  return (
    <div>
      <h2>Chamados</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <strong>{ticket.titulo}</strong> - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
