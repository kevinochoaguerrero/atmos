"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Combobox } from "./ui/combobox"; // Ensure this path is correct
import { Button } from "@/components/ui/button";
import { Chart } from "./ui/chart";

// Define the City interface
interface City {
  name: string;
  alternativeName: string;
  coords: [number, number];
  description: string;
  state: string;
}

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [activeCity, setActiveCity] = useState<City | null>(null);

  const cities: City[] = [
    {
      name: "Hermosillo, Sonora",
      alternativeName: "City of the Sun",
      coords: [-110.9629, 29.0729],
      description: "Capital of Sonora, known for its warm climate and cuisine.",
      state: "Sonora",
    },
    {
      name: "Mexico City, CDMX",
      alternativeName: "The Capital",
      coords: [-99.1332, 19.4326],
      description:
        "The capital of the country, known for its rich history, culture, and diversity.",
      state: "CDMX",
    },
    {
      name: "Guadalajara, Jalisco",
      alternativeName: "City of Roses",
      coords: [-103.3485, 20.6767],
      description:
        "Famous for mariachi and tequila, it is the capital of Jalisco.",
      state: "Jalisco",
    },
    {
      name: "Monterrey, Nuevo León",
      alternativeName: "The Sultana of the North",
      coords: [-100.3161, 25.6866],
      description:
        "One of the most important cities in northern Mexico, known for its industry and modernity.",
      state: "Nuevo León",
    },
    {
      name: "Mérida, Yucatán",
      alternativeName: "The White City",
      coords: [-89.1757, 21.1619],
      description:
        "The capital of Yucatán, known for its colonial architecture, Mayan culture, and cuisine.",
      state: "Yucatán",
    },
  ];

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
        [-118.407, 14.537],
        [-86.691, 32.716],
      ];

      mapRef.current.setMaxBounds(bounds);
      mapRef.current.fitBounds(bounds, { padding: 20 });

      return () => {
        mapRef.current?.remove();
      };
    }
  }, []);

  const handleZoomToCity = (city: City) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: city.coords,
        zoom: 10,
        essential: true,
      });
      setActiveCity(city);
    }
  };

  return (
    <div>
      <div>
        <div
          className="map-container"
          ref={mapContainerRef}
          style={{ width: "100%", height: "100vh", position: "relative" }}
        />
        <div className="absolute top-2 left-2 text-white p-2 text-lg font-bold">
          México
        </div>
        <div className="absolute right-2 top-2">
          <Combobox onCitySelect={handleZoomToCity} cities={cities} />
        </div>
      </div>
      {activeCity ? (
        <div>
          <div className="absolute bottom-[264px] md:bottom-[272px] left-1/2 z-10 bg-black/50 backdrop-blur-md text-white p-4 rounded shadow-lg md:w-[30%] w-[90%] transform -translate-x-1/2">
            <div className="flex flex-col">
              <h3 className="font-bold text-lg">
                {activeCity.alternativeName}
              </h3>
              <p>{activeCity.description}</p>
              <div className="flex justify-end">
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-fit border border-[#0052B0]">
                    Go to the source
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="absolute md:bottom-2 bottom-0 left-1/2 z-10 bg-black/50 backdrop-blur-md text-white p-4 rounded shadow-lg md:w-[30%] w-[90%] transform -translate-x-1/2">
            <span className="font-bold">Average pollution 2019</span>
            <Chart />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Map;
