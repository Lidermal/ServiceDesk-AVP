import React from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';

function App() {
  return (
    <div style={{ fontFamily: 'Arial', backgroundColor: '#f4f8fb', padding: '20px' }}>
      <h1 style={{ color: '#004080' }}>Service Desk AVP Conecta</h1>
      <TicketForm />
      <TicketList />
    </div>
  );
}

export default App;
