// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Combobox } from "./ui/combobox"; // Asegúrate de tener este componente
import { Button } from "@/components/ui/button"; // Asegúrate de tener este componente
import { Chart } from "./ui/chart"; // Asegúrate de tener este componente
import { dataList } from "@/air-data"; // Asegúrate de tener este archivo JSON
import Link from "next/link";


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
  const [activeDataIndex, setActiveDataIndex] = useState<number>(5);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(5);

  const cities: City[] = [
    {
      name: "Hermosillo, Sonora",
      alternativeName: "City of the Sun",
      coords: [-110.9629, 28.8],
      description: "Capital of Sonora, known for its warm climate and cuisine.",
      state: "Sonora",
    },
    {
      name: "Mexico City, CDMX",
      alternativeName: "The Capital",
      coords: [-99.1332, 18.9],
      description:
        "The capital of the country, known for its rich history, culture, and diversity.",
      state: "CDMX",
    },
    {
      name: "Guadalajara, Jalisco",
      alternativeName: "City of Roses",
      coords: [-103.3485, 20.1],
      description:
        "Famous for mariachi and tequila, it is the capital of Jalisco.",
      state: "Jalisco",
    },
    {
      name: "Monterrey, Nuevo León",
      alternativeName: "The Sultana of the North",
      coords: [-100.3161, 25.2],
      description:
        "One of the most important cities in northern Mexico, known for its industry and modernity.",
      state: "Nuevo León",
    },
    {
      name: "Mérida, Yucatán",
      alternativeName: "The White City",
      coords: [-89.5, 20.6],
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

      const sourceId = "air-quality-source";

      const addDataLayer = (data: unknown) => {
        if (mapRef.current?.getSource(sourceId)) {
          mapRef.current.removeLayer(`${sourceId}-high1`);
          mapRef.current.removeLayer(`${sourceId}-high2`);
          mapRef.current.removeLayer(`${sourceId}-high3`);
          mapRef.current.removeLayer(`${sourceId}-low1`);
          mapRef.current.removeLayer(`${sourceId}-low2`);
          mapRef.current.removeLayer(`${sourceId}-low3`);
          mapRef.current.removeSource(sourceId);
        }

        mapRef.current?.addSource(sourceId, {
          type: "geojson",
          data: data.high1,
        });

        const sources = [
          { id: `${sourceId}-high1`, data: data.high1, color: "#0180A4" },
          { id: `${sourceId}-high2`, data: data.high2, color: "#0169AA" },
          { id: `${sourceId}-high3`, data: data.high3, color: "#0155B0" },
          { id: `${sourceId}-low1`, data: data.low1, color: "#01A39C" },
          { id: `${sourceId}-low2`, data: data.low2, color: "#01C593" },
          { id: `${sourceId}-low3`, data: data.low3, color: "#36F1B9" },
        ];

        sources.forEach((source) => {
          mapRef.current?.addSource(source.id, {
            type: "geojson",
            data: source.data,
          });

          mapRef.current?.addLayer({
            id: `${source.id}-polygons`,
            type: "fill",
            source: source.id,
            paint: {
              "fill-color": source.color,
              "fill-opacity": 0.5,
            },
          });
        });
      };

      mapRef.current.on("load", () => {
        addDataLayer(dataList[activeDataIndex]);

        mapRef.current.on("click", (e: mapboxgl.MapMouseEvent) => {
          const features = mapRef.current?.queryRenderedFeatures(e.point);
          if (features && features.length) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const feature = features[0];
            // Aquí puedes manejar el clic en el feature
          }
        });
      });

      return () => {
        mapRef.current?.remove();
      };
    }
  }, [activeDataIndex]);

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

  const handleDataChange = (index: number) => {
    setActiveDataIndex(index);
    setActiveButtonIndex(index);
  };

  return (
    <div className="relative">
      <div>
        <div
          className="map-container"
          ref={mapContainerRef}
          style={{ width: "100%", height: "100vh", position: "relative" }}
        />

        <div className="absolute right-1 md:right-24 top-1/2 transform -translate-y-1/2 h-[35vh] w-2 rounded-full bg-gradient-to-b from-[#36F1B9] to-[#0155B0] z-20">
          <span className="absolute -top-12 right-[1px] transform -translate-x-1/2 text-white text-sm mt-1">
            Emission Density
          </span>
        </div>
        <Link href="/" passHref>
          <div className="absolute top-2 left-2 text-white p-2 text-lg font-bold">
            México (N02 gas vision)
          </div>
        </Link>

        <div className="absolute right-1 top-2">
          <Combobox onCitySelect={handleZoomToCity} cities={cities} />
        </div>

        <div className="absolute md:bottom-[24px] bottom-[56px] left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {dataList.map((_, index) => (
            <Button
              key={index}
              onClick={() => handleDataChange(index)}
              className={
                activeButtonIndex === index
                  ? "text-white text-xs p-2 font-bold bg-none"
                  : "text-gray-600 text-xs p-2"
              }
            >
              {index + 2019}
            </Button>
          ))}
        </div>
      </div>

      {activeCity && (
        <div>
          <div className="absolute bottom-[250px] md:bottom-[268px] left-1/2 z-10 bg-black/50 backdrop-blur-md text-white p-4 rounded shadow-lg md:w-[30%] w-[90%] transform -translate-x-1/2">
            <div className="flex flex-col">
              <h3 className="font-bold text-md">
                {activeCity.alternativeName}
              </h3>
              <p className="text-sm">{activeCity.description}</p>
              <div className="flex justify-end">
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-fit text-sm border border-[#0052B0]">
                    Go to the source
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="absolute md:bottom-[72px] bottom-[105px] left-1/2 z-10 bg-black/50 backdrop-blur-md text-white p-4 rounded shadow-lg md:w-[30%] w-[90%] transform -translate-x-1/2">
            <span className="font-bold">
              Monthly average: (Work in progress)
            </span>
            <Chart data={dataList[activeDataIndex]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
