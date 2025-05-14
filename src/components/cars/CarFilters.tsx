
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { getAvailableBrands } from '@/data/brandService';

interface CarFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
}

export const CarFilters: React.FC<CarFiltersProps> = ({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange
}) => {
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  useEffect(() => {
    const brands = getAvailableBrands();
    setAvailableBrands(brands);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Search Filter */}
      <Input
        type="text"
        placeholder="Buscar por marca o modelo"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Brand Filter */}
      <select
        className="p-2 border rounded"
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
      >
        <option value="">Todas las marcas</option>
        {availableBrands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>

      {/* Price Range Filter */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Rango de precio (€):</label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-24"
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-24"
          />
        </div>
        <Slider
          defaultValue={priceRange}
          max={1000000}
          step={1000}
          onValueChange={(value) => setPriceRange(value)}
        />
      </div>
    </div>
  );
};
