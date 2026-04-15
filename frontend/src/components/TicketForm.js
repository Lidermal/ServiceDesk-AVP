import React, { useState } from 'react';
import axios from 'axios';

function TicketForm() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://dev.avpconecta.com.br/api/chamados', { 
      titulo, 
      descricao, 
      criado_por: 1 // exemplo: ID do usuário suporte
    });
    setTitulo('');
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Título do chamado" 
        value={titulo} 
        onChange={(e) => setTitulo(e.target.value)} 
      />
      <textarea 
        placeholder="Descrição do problema" 
        value={descricao} 
        onChange={(e) => setDescricao(e.target.value)} 
      />
      <button type="submit">Abrir Chamado</button>
    </form>
  );
}

export default TicketForm;
