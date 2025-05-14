
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car } from '@/types/car';
import { CarList } from './CarList';

interface CarCategoriesProps {
  allCars: Car[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  onResetFilters: () => void;
}

export const CarCategories: React.FC<CarCategoriesProps> = ({ 
  allCars, 
  activeTab, 
  setActiveTab, 
  onResetFilters 
}) => {
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

  return (
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
      <CarList cars={filteredCars} onResetFilters={onResetFilters} />
    </Tabs>
  );
};
