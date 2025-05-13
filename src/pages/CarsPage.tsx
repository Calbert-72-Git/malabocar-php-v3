
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getFilteredCars, getAvailableBrands } from '../data/cars';
import { formatPrice } from '../utils/formatters';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { Card, CardContent } from '../components/ui/card';
import { AspectRatio } from '../components/ui/aspect-ratio';

const CarsPage = () => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const navigate = useNavigate();

  useEffect(() => {
    const brands = getAvailableBrands();
    setAvailableBrands(brands);
  }, []);

  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  // Filtrar los coches según los criterios
  const filteredCars = getFilteredCars(search, minPrice, maxPrice, selectedBrand);
  
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Explora nuestro catálogo</h1>

        {/* Filters */}
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

        {/* Car List */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCars.map((car) => (
            <Card
              key={car.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/car/${car.id}`)}
            >
              <CardContent className="p-0">
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{car.brand} {car.model}</h2>
                  <p className="text-gray-600">{car.year}</p>
                  <p className="text-xl font-bold text-automotive-600">{formatPrice(car.price)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CarsPage;
