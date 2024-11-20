import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const MeuPerfil = () => {
    const [profile, setProfile] = useState({ name: '', email: '', preferences: {} });
  
    useEffect(() => {
      axios.get('/api/profile')
        .then(response => setProfile(response.data))
        .catch(error => console.error('Error fetching profile', error));
    }, []);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.put('/api/profile', profile)
        .then(response => {
          // Lidar com a resposta
        })
        .catch(error => console.error('Error updating profile', error));
    };
  
    return (
      <div>
        <h1>Meu Perfil</h1>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
          <label>Email:</label>
          <input type="email" name="email" value={profile.email} onChange={handleInputChange} />
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  };
  