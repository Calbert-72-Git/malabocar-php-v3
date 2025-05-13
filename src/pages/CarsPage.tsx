
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getFilteredCars, getAvailableBrands } from '../data/cars';
import { formatPrice } from '../utils/formatters';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { Card, CardContent } from '../components/ui/card';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { Car } from '../types/car';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { ShareVehicleButton } from '../components/car-detail/ShareVehicleButton';

const CarsPage = () => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const brands = getAvailableBrands();
    setAvailableBrands(brands);
  }, []);

  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  // Get all cars and apply filters
  const allCars = getFilteredCars(search, minPrice, maxPrice, selectedBrand);
  
  // Group cars by category
  const getCarsByCategory = (category: string): Car[] => {
    switch (category) {
      case 'recent':
        // Sort by year, newer first
        return [...allCars].sort((a, b) => b.year - a.year).slice(0, 6);
      case 'popular':
        // For demo purposes, just use stock as popularity indicator (lower stock means more popular)
        return [...allCars].sort((a, b) => a.stock - b.stock).slice(0, 6);
      case 'orders':
        // For demo purposes, show cars with lower stock
        return allCars.filter(car => car.stock <= 2);
      case 'all':
      default:
        return allCars;
    }
  };
  
  const filteredCars = getCarsByCategory(activeTab);
  
  const CarCard = ({ car }: { car: Car }) => (
    <Card
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer relative"
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
          
          <div className="mt-4 flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 mr-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/car/${car.id}`);
              }}
            >
              Ver detalles
            </Button>
            <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
              <ShareVehicleButton car={car} variant="icon" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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

        {/* Car Categories Tabs */}
        <Tabs 
          defaultValue="all" 
          className="mb-8"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="recent">Más recientes</TabsTrigger>
            <TabsTrigger value="popular">Más vendidos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos en curso</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Todos los vehículos</h2>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Vehículos más recientes</h2>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Vehículos más vendidos</h2>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Pedidos en curso (stock limitado)</h2>
          </TabsContent>

          {/* Car List - Same for all tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No se encontraron vehículos que coincidan con los criterios de búsqueda.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearch('');
                    setSelectedBrand('');
                    setPriceRange([0, 1000000]);
                    setActiveTab('all');
                  }}
                >
                  Reiniciar filtros
                </Button>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CarsPage;
