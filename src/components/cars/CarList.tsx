
import React from 'react';
import { Button } from '@/components/ui/button';
import { Car } from '@/types/car';
import { CarCard } from './CarCard';

interface CarListProps {
  cars: Car[];
  onResetFilters: () => void;
}

export const CarList: React.FC<CarListProps> = ({ cars, onResetFilters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cars.length > 0 ? (
        cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No se encontraron vehículos que coincidan con los criterios de búsqueda.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={onResetFilters}
          >
            Reiniciar filtros
          </Button>
        </div>
      )}
    </div>
  );
};
