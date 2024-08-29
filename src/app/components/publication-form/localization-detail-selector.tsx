"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label, Select } from "flowbite-react";
import { City, Province } from "@/src/app/types";
import { createClient } from "@/src/app/utils/supabase/client";

const supabase = createClient();

export default function LocalizationDetailSelector({
  provinces,
  existentSelection,
}: {
  provinces: Province[];
  existentSelection: {
    province?: number;
    city?: number;
  };
}) {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(
    existentSelection?.province || null
  );

  const [selectedCity, setSelectedCity] = useState<number | null>(
    existentSelection?.city || null
  );

  return (
    <>
      <ProvinceSelector
        provinces={provinces}
        onSelectProvince={setSelectedProvince}
        selectedProvince={selectedProvince}
      />
      <CitySelector
        province={selectedProvince}
        onSelectedCity={setSelectedCity}
        selectedCity={selectedCity}
      />
    </>
  );
}

function ProvinceSelector({
  provinces,
  onSelectProvince,
  selectedProvince,
}: {
  provinces: Province[];
  onSelectProvince: Dispatch<SetStateAction<number | null>>;
  selectedProvince: number | null;
}) {
  return (
    <div className="mb-6 grid">
      <Label htmlFor="province">Provincia</Label>
      <Select
        id="province"
        name="province"
        onChange={(e) => onSelectProvince(Number(e.target.value) || null)}
        value={selectedProvince?.toString() || ""}
      >
        <option value="">Seleccione una provincia</option>
        {provinces.map((province) => (
          <option value={province.id} key={province.id}>
            {province.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

function CitySelector({
  province,
  onSelectedCity,
  selectedCity,
}: {
  province: number | null;
  onSelectedCity: Dispatch<SetStateAction<number | null>>;
  selectedCity: number | null;
}) {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (province) {
      const fetchCities = async () => {
        const { data, error } = await supabase
          .from("cities")
          .select()
          .eq("province_id", province);

        if (error) {
          throw error;
        }

        setCities(data);
      };
      fetchCities();
    }
  }, [province]);

  return (
    <div className="mb-6 grid">
      <Label htmlFor="city">Ciudad</Label>
      <Select
        id="city"
        name="city"
        onChange={(e) => onSelectedCity(Number(e.target.value) || null)}
        value={selectedCity?.toString() || ""}
      >
        <option value="">Seleccione una ciudad</option>
        {cities &&
          cities.map((city) => (
            <option value={city.id} key={city.id}>
              {city.name}
            </option>
          ))}
      </Select>
    </div>
  );
}
