"use client";

import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/kevtrosky/cm1x36zc6002701pu07ek9x72",
        center: [-102.5528, 23.6345],
        minZoom: 5, 
        maxZoom: 8, 
      });

      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default Map;
