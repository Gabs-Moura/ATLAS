import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const StatusDoCarregamento = () => {
    const [chargingStatus, setChargingStatus] = useState({});
    const [chargingTime, setChargingTime] = useState(0);
  
    useEffect(() => {
      axios.get('/api/charging-status')
        .then(response => {
          setChargingStatus(response.data);
          calculateChargingTime(response.data);
        })
        .catch(error => console.error('Error fetching charging status', error));
    }, []);
  
    const calculateChargingTime = (status) => {
      axios.post('/api/predict', {
        weather: status.weather,
        event: status.event,
        time_of_day: status.time_of_day,
        renewable_allocation: status.renewable_sources,
        current_capacity: status.grid_capacity
      })
      .then(response => setChargingTime(response.data.prediction))
      .catch(error => console.error('Error calculating charging time', error));
    };
  
    return (
      <div>
        <h1>Status do Carregamento</h1>
        <p>Energia Solar: {chargingStatus.solar}%</p>
        <p>Energia Eólica: {chargingStatus.wind}%</p>
        <p>Capacidade Atual: {chargingStatus.current_capacity} kW</p>
        <p>Tempo Estimado de Carregamento: {chargingTime} horas</p>
      </div>
    );
  };
  