import React, { useState } from 'react'; 
import axios from 'axios';

const CadastrarVeiculo = () => {
    const [vehicle, setVehicle] = useState({ name: '', model: '', year: '' });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setVehicle(prevVehicle => ({ ...prevVehicle, [name]: value }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('/api/vehicles', vehicle)
        .then(response => {
          // Lidar com a resposta
        })
        .catch(error => console.error('Error registering vehicle', error));
    };
  
    return (
      <div>
        <h1>Cadastrar Veículo</h1>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input type="text" name="name" value={vehicle.name} onChange={handleInputChange} />
          <label>Modelo:</label>
          <input type="text" name="model" value={vehicle.model} onChange={handleInputChange} />
          <label>Ano:</label>
          <input type="text" name="year" value={vehicle.year} onChange={handleInputChange} />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  };
  