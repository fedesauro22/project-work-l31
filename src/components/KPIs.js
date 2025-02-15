import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const KPIs = ({ data }) => {
  // Calcola la resa media (kg/ettaro) arrotondata a 2 cifre decimali
  const avgYield = (data.reduce((sum, d) => sum + d.yield_kg, 0) / data.length).toFixed(2);
  // Calcola il tempo medio di crescita (giorni) arrotondato a 2 cifre decimali
  const avgGrowthTime = (data.reduce((sum, d) => sum + d.growth_time_days, 0) / data.length).toFixed(2);

  return (
    <Grid container spacing={3}>
      {/* Card per visualizzare la resa media */}
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h6">Resa Media (kg/ettaro)</Typography>
          <Typography variant="h4">{avgYield || 0}</Typography>
        </Paper>
      </Grid>
      {/* Card per visualizzare il tempo medio di crescita */}
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h6">Tempo Medio di Crescita (giorni)</Typography>
          <Typography variant="h4">{avgGrowthTime || 0}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default KPIs;
