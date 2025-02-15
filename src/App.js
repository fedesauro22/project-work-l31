import React from 'react';
import { Container, Typography } from '@mui/material';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Container>
      {/* Titolo principale della dashboard */}
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard Interattivo - Produzione Zucchine
      </Typography>
      {/* Componente principale che gestisce la visualizzazione dei dati */}
      <Dashboard />
    </Container>
  );
}

export default App;
