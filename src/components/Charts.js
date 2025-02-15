import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Box, Typography } from '@mui/material';

const Charts = ({ data }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Sezione per il grafico della resa media mensile del raccolto */}
      <Box>
        <Typography variant="h6" align="center">
          Resa Media Mensile del Raccolto
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> {/* Griglia del grafico */}
            <XAxis dataKey="month" /> {/* Asse X che rappresenta i mesi */}
            <YAxis /> {/* Asse Y per i valori */}
            <Tooltip /> {/* Tooltip per mostrare i dettagli al passaggio del mouse */}
            <Legend /> {/* Legenda del grafico */}
            <Line
              type="monotone"
              dataKey="yield_kg"
              stroke="#82ca9d"
              name="Resa (kg)"
            /> {/* Linea che rappresenta la resa media */}
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Sezione per il grafico della temperatura media mensile */}
      <Box>
        <Typography variant="h6" align="center">
          Andamento della Temperatura Media Mensile
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> {/* Griglia del grafico */}
            <XAxis dataKey="month" /> {/* Asse X che rappresenta i mesi */}
            <YAxis /> {/* Asse Y per i valori */}
            <Tooltip /> {/* Tooltip per mostrare i dettagli al passaggio del mouse */}
            <Legend /> {/* Legenda del grafico */}
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ffc658"
              name="Temperatura (°C)"
            /> {/* Linea che rappresenta la temperatura media */}
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Sezione per il grafico delle precipitazioni medie mensili */}
      <Box>
        <Typography variant="h6" align="center">
          Precipitazioni Medie Mensili
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> {/* Griglia del grafico */}
            <XAxis dataKey="month" /> {/* Asse X che rappresenta i mesi */}
            <YAxis /> {/* Asse Y per i valori */}
            <Tooltip /> {/* Tooltip per mostrare i dettagli al passaggio del mouse */}
            <Legend /> {/* Legenda del grafico */}
            <Line
              type="monotone"
              dataKey="rainfall"
              stroke="#8884d8"
              name="Precipitazioni (mm)"
            /> {/* Linea che rappresenta le precipitazioni medie */}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Charts;
