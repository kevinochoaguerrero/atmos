"use client";

import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

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
        zoom: 12, // Zoom deseado para ver Hermosillo
        essential: true, // Solo para acceder a la animación
      });
    }
  };

  return (
    <div>
      <button onClick={handleZoomToHermosillo} style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}>
        Ver Hermosillo
      </button>
      <div
        className="map-container"
        ref={mapContainerRef}
        style={{ width: "100%", height: "100vh" }}
      />
    </div>
  );
};

export default Map;
