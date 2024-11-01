import React, { useState } from 'react';
import ClienteList from './components/ClienteList';
import ClienteForm from './components/ClienteForm';
import './styles.css';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleClienteCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app-container">
      <h1>Gerenciamento de Clientes</h1>
      <ClienteForm onClienteCreated={handleClienteCreated} />
      <ClienteList key={refresh} />
    </div>
  );
};

export default App;
