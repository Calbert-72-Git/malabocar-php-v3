import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CarCard from '../components/CarCard';
import { getFilteredCars, getAvailableBrands } from '../data/cars';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Search, Filter, X, RefreshCw } from 'lucide-react';

const CarsPage = () => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');
  
  const brands = getAvailableBrands();
  const filteredCars = getFilteredCars(search, minPrice, maxPrice, selectedBrand, 
    selectedYear ? parseInt(selectedYear) : undefined, selectedFuelType);
  
  // Recopilar años y tipos de combustible disponibles
  useEffect(() => {
    const allCars = getFilteredCars('', 0, 1000000, '');
    const uniqueYears = Array.from(new Set(allCars.map(car => car.year))).sort((a, b) => b - a);
    const uniqueFuelTypes = Array.from(new Set(allCars.map(car => car.specs.fuelType)));
    
    setYears(uniqueYears);
    setFuelTypes(uniqueFuelTypes);
  }, []);
  
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
    setSelectedYear('');
    setSelectedFuelType('');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Catálogo de vehículos
          </h1>
          <p className="text-gray-500">
            Encuentra tu coche ideal entre nuestra selección de vehículos premium
          </p>
        </div>
        
        {/* Mobile Search and Filter Toggle */}
        <div className="flex items-center gap-2 mb-6 lg:hidden">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por marca o modelo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2"
            />
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <Card className={`w-full lg:w-64 transition-all duration-300 ${showFilters ? 'max-h-[1000px]' : 'max-h-0 lg:max-h-[1000px] overflow-hidden lg:overflow-visible'}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Filtros</CardTitle>
              <Button variant="ghost" size="icon" onClick={toggleFilters} className="lg:hidden">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div className="hidden lg:block">
                <Label htmlFor="search" className="mb-2 block">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Marca o modelo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2"
                  />
                </div>
              </div>
              
              {/* Brand filter */}
              <div>
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
              
              {/* Year filter */}
              <div>
                <Label htmlFor="year" className="mb-2 block">Año</Label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-automotive-500 focus:outline-none focus:ring-automotive-500"
                >
                  <option value="">Todos los años</option>
                  {years.map((year) => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>
              
              {/* Fuel type filter */}
              <div>
                <Label htmlFor="fuelType" className="mb-2 block">Combustible</Label>
                <select
                  id="fuelType"
                  value={selectedFuelType}
                  onChange={(e) => setSelectedFuelType(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-automotive-500 focus:outline-none focus:ring-automotive-500"
                >
                  <option value="">Todos los combustibles</option>
                  {fuelTypes.map((fuelType) => (
                    <option key={fuelType} value={fuelType}>{fuelType}</option>
                  ))}
                </select>
              </div>
              
              {/* Price range */}
              <div>
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
                className="w-full mt-4 flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reiniciar filtros
              </Button>
            </CardContent>
          </Card>
          
          {/* Car listing */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500">
                {filteredCars.length} vehículos encontrados
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Ordenar por:</span>
                <select className="rounded-md border border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-automotive-500 focus:outline-none focus:ring-automotive-500">
                  <option>Más recientes</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                  <option>Kilometraje</option>
                </select>
              </div>
            </div>
            
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
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
