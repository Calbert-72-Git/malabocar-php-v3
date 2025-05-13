
import React, { useState } from 'react';
import Layout from '../components/Layout';
import CarCard from '../components/CarCard';
import { getFilteredCars, getAvailableBrands } from '../data/cars';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';

const CarsPage = () => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedBrand, setSelectedBrand] = useState('');
  
  const brands = getAvailableBrands();
  const filteredCars = getFilteredCars(search, minPrice, maxPrice, selectedBrand);
  
  const handlePriceRangeChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  const resetFilters = () => {
    setSearch('');
    setMinPrice(0);
    setMaxPrice(100000);
    setSelectedBrand('');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-8">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros</h2>
              
              {/* Search */}
              <div className="mb-6">
                <Label htmlFor="search" className="mb-2 block">Buscar</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Marca o modelo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {/* Brand filter */}
              <div className="mb-6">
                <Label htmlFor="brand" className="mb-2 block">Marca</Label>
                <select
                  id="brand"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-automotive-500 focus:outline-none focus:ring-automotive-500"
                >
                  <option value="">Todas las marcas</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              {/* Price range */}
              <div className="mb-6">
                <Label className="mb-2 block">Rango de precio</Label>
                <div className="mt-6 px-2">
                  <Slider 
                    defaultValue={[minPrice, maxPrice]} 
                    min={0} 
                    max={100000} 
                    step={1000}
                    value={[minPrice, maxPrice]}
                    onValueChange={handlePriceRangeChange}
                    className="my-6"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>{formatPrice(minPrice)}</span>
                  <span>{formatPrice(maxPrice)}</span>
                </div>
              </div>
              
              {/* Reset button */}
              <Button 
                onClick={resetFilters} 
                variant="outline" 
                className="w-full mt-4"
              >
                Reiniciar filtros
              </Button>
            </div>
          </div>
          
          {/* Car listing */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Coches disponibles
              </h1>
              <p className="text-gray-500">
                {filteredCars.length} vehículos encontrados
              </p>
            </div>
            
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No se encontraron vehículos</h3>
                <p className="mt-2 text-gray-500">
                  Intente con otros filtros o reinicie la búsqueda.
                </p>
                <Button onClick={resetFilters} className="mt-4 bg-automotive-600 hover:bg-automotive-700">
                  Reiniciar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarsPage;
