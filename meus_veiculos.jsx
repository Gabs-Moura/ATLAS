import React, { useState, useEffect } from 'react'; 
import axios from 'axios'

const MeusVeiculos = () => {
    const [vehicles, setVehicles] = useState([]);
  
    useEffect(() => {
      axios.get('/api/vehicles')
        .then(response => setVehicles(response.data))
        .catch(error => console.error('Error fetching vehicles', error));
    }, []);
  
    return (
      <div>
        <h1>Meus Veículos</h1>
        <ul>
          {vehicles.map(vehicle => (
            <li key={vehicle.id}>{vehicle.name} - {vehicle.model}</li>
          ))}
        </ul>
      </div>
    );
  };
  