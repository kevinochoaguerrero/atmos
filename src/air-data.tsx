import no22019 from "./data/no22019.json";
import no22020 from "./data/no22020.json";
import no22021 from "./data/no22021.json";
import no22022 from "./data/no22022.json";
import no22023 from "./data/no22023.json";
import no22024 from "./data/no22024.json";

export type Air = {
  id: string;
  year: string;
  mean_T: number;
  std_T: number;
  min_T: number;
  max_T: number;
  high1: HighLowType;
  high2: HighLowType;
  high3: HighLowType;
  low1: HighLowType; // Añadido low1
  low2: HighLowType;
  low3: HighLowType;
};

export type HighLowType = {
  type: string;
  columns: { count: string; label: string; "system:index": string };
  features: FeatureType[];
};

export type FeatureType = {
  type: string;
  geometry: {
    geodesic: boolean;
    type: string;
    coordinates: number[][][];
  };
  id: string;
  properties: { count: number; label: number };
};

// Lista de datos
export const dataList: Air[] = [
  no22019,
  no22020,
  no22021,
  no22022,
  no22023,
  no22024,
];

// Diccionario de datos
export const dataDict = {
  no22019: no22019,
  no22020: no22020,
  no22021: no22021,
  no22022: no22022,
  no22023: no22023,
  no22024: no22024,
};
