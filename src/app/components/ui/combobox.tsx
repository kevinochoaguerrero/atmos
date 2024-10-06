"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust the path as necessary
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define an interface for cities
interface City {
  name: string;
  alternativeName: string;
  coords: [number, number];
  description: string;
  state: string;
}

// Define the properties of the component
interface ComboboxProps {
  onCitySelect: (city: City) => void; // Callback that receives a city
  cities: City[]; // Array of cities
}

export function Combobox({ onCitySelect, cities }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectedCity = cities.find((city) => city.name === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="group">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="relative w-fit justify-between border bg-black/50 backdrop-blur-md text-white border-[#00C792] translate-all duration-300 ease-in-out group-hover:bg-[#00C792] p-4"
          >
            {selectedCity ? selectedCity.name : "Select a city"}
            <ChevronDown
              strokeWidth={3}
              className="ml-2 h-4 w-4 shrink-0 stroke-[#00C792] group-hover:stroke-black"
            />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit bg-black/20 backdrop-blur-md border-none">
        <Command>
          <CommandList>
            <CommandEmpty>No cities found.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.name}
                  value={city.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onCitySelect(city); // Call the function passed as a prop
                    setOpen(false);
                  }}
                >
                  {city.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
