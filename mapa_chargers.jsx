import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapaDeCarregadores = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get('/api/charging-stations')
      .then(response => setStations(response.data))
      .catch(error => console.error('Error fetching stations', error));
  }, []);

  return (
    <MapContainer center={[-23.5505, -46.6333]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {stations.map(station => (
        <Marker key={station.id} position={[station.lat, station.lng]}>
          <Popup>{station.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
