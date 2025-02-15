import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent } from "@mui/material";
import Charts from "./Charts";
import axios from "axios";
import KPIs from "./KPIs";

const Dashboard = () => {
  // State che conserverà i dati provenienti dalla chiamata senza alterazioni
  const [totalData, setTotalData] = useState([]);
  // State che conserverà i dati provenienti dalla chiamata dopo le varie modifiche necessarie per la corretta visualizzazione dei dati
  const [monthlyData, setMonthlyData] = useState([]);

  // Hook che si avvia al caricamento del componente
  useEffect(() => {
    // Carica i dati provenienti dalla simulazione.
    // L'operazione get potrebbe essere effettuata verso una API in modo tale da collegarsi ad un sistema reale
    axios
      .get("/data/simulatedData.json")
      .then((response) => {
        setTotalData(response.data);

        // Calcola i dati medi mensili
        const groupedData = response.data.reduce((acc, item) => {
          // Estrae "YYYY-MM", in modo tale da permettere la divisione per anno-mese
          const month = item.date.slice(0, 7);
          if (!acc[month]) {
            acc[month] = {
              month,
              temperature: [],
              rainfall: [],
              yield_kg: [],
            };
          }
          // Aggiunge i valori correnti per ogni categoria nel mese corrispondente
          acc[month].temperature.push(item.temperature);
          acc[month].rainfall.push(item.rainfall);
          acc[month].yield_kg.push(item.yield_kg);
          return acc;
        }, {});

        // Calcola le medie per ogni mese e arrotonda a 2 cifre decimali
        const monthlyAverages = Object.values(groupedData).map((monthData) => ({
          month: monthData.month, // Mese in formato "YYYY-MM"
          temperature: parseFloat(
            (
              monthData.temperature.reduce((a, b) => a + b, 0) /
              monthData.temperature.length
            ).toFixed(2)
          ), // Media della temperatura
          rainfall: parseInt(
            monthData.rainfall.reduce((a, b) => a + b, 0) /
              monthData.rainfall.length
          ), // Media delle precipitazioni (arrotondata all'intero)
          yield_kg: parseFloat(
            (
              monthData.yield_kg.reduce((a, b) => a + b, 0) /
              monthData.yield_kg.length
            ).toFixed(2)
          ), // Media della resa (in kg)
        }));

        // Aggiorna lo stato con i dati medi mensili
        setMonthlyData(monthlyAverages);
      })
      .catch((error) => console.error("Errore nel caricamento dati:", error)); // Gestione degli errori nella chiamata axios
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      {/* Componente per visualizzare gli indicatori di performance (Key Performance Indicators) utilizzando i dati totali */}
        <KPIs data={totalData}></KPIs>
        <Card>
          <CardContent>
            {/* Componente per visualizzare i grafici con i dati suddivisi per anno-mese */}
            <Charts data={monthlyData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
