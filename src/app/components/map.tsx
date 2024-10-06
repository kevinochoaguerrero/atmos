"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [showInfo, setShowInfo] = useState(false); // Estado para controlar la visibilidad del div
  const [fadeIn, setFadeIn] = useState(false); // Estado para controlar la animación

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/kevtrosky/cm1x36zc6002701pu07ek9x72",
        center: [-102.5528, 23.6345],
        minZoom: 1,
        maxZoom: 8,
      });

      const bounds: [[number, number], [number, number]] = [
        [-118.407, 14.537], // Esquina suroeste
        [-86.691, 32.716],  // Esquina noreste
      ];

      mapRef.current.setMaxBounds(bounds);
      mapRef.current.fitBounds(bounds, { padding: 20 });

      return () => {
        mapRef.current?.remove();
      };
    }
  }, []);

  const handleZoomToHermosillo = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [-110.9559, 29.0729], // Coordenadas de Hermosillo, Sonora
        zoom: 10, // Zoom deseado para ver Hermosillo
        essential: true, // Solo para acceder a la animación
      });
      setShowInfo(true); // Mostrar el div de información
      setTimeout(() => setFadeIn(true), 0); // Activar la animación después de un breve retraso
    }
  };

  return (
    <div>
      <button onClick={handleZoomToHermosillo} className="absolute top-10 left-10 z-10 bg-blue-500 text-white p-2 rounded">
        Ver Hermosillo
      </button>
      <div
        className="map-container"
        ref={mapContainerRef}
        style={{ width: "100%", height: "100vh" }}
      />
      
      {showInfo && (
        <div className={`absolute top-20 left-10 bg-black text-white p-4 rounded shadow-lg z-20 transition-opacity duration-500 ease-in ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="font-bold text-lg">Hermosillo, Sonora</h3>
          <p>Hermosillo es la capital del estado de Sonora, México. Es conocida por su clima cálido y su rica historia cultural.</p>
          <p>Algunos puntos de interés incluyen la Catedral Metropolitana de Hermosillo, el Parque La Ruina, y el Cerro de la Campana.</p>
        </div>
      )}
    </div>
  );
};

export default Map;