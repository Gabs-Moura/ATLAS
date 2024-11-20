import React, { useState } from 'react'; 
import axios from 'axios';

const OpcoesDeCarregamento = () => {
    const [preferences, setPreferences] = useState({ solar: 50, wind: 50, offPeak: true });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setPreferences(prevPreferences => ({ ...prevPreferences, [name]: value }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.put('/api/charging-preferences', preferences)
        .then(response => {
          // Lidar com a resposta
        })
        .catch(error => console.error('Error updating preferences', error));
    };
  
    return (
      <div>
        <h1>Opções de Carregamento</h1>
        <form onSubmit={handleSubmit}>
          <label>Energia Solar:</label>
          <input type="number" name="solar" value={preferences.solar} onChange={handleInputChange} />
          <label>Energia Eólica:</label>
          <input type="number" name="wind" value={preferences.wind} onChange={handleInputChange} />
          <label>Carregamento em Horários de Menor Demanda:</label>
          <input type="checkbox" name="offPeak" checked={preferences.offPeak} onChange={handleInputChange} />
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  };
  