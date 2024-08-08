import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent() {
  useEffect(() => {
    const map = L.map('map').setView([36.70521483323924, 3.1739263288356385], 13); // Centered at the specified coordinates with zoom level 14

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define custom marker icon
    const customIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    // Add marker for the specified location (Esi Oued Smar)
    const marker = L.marker([36.70521483323924, 3.1739263288356385], { icon: customIcon }).addTo(map);

    // Bind a popup to the marker to show the location name
    marker.bindPopup('<b>Higher National School of Computer Science</b>').openPopup();

    return () => {
      map.remove(); // Cleanup function to remove the map instance
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  return <div id="map" style={{ height: '400px', width: '100%',zIndex:'0' }} />;
}

export default MapComponent;
