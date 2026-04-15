import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('https://helpdesk.avpconecta.com.br/api/tickets').then(res => setTickets(res.data));
  }, []);

  return (
    <div>
      <h2>Chamados</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>
            <strong>{ticket.titulo}</strong> - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
