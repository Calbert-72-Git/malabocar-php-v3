
import React from 'react';
import { Car } from '../../types/car';
import { formatPrice } from '../../utils/formatters';

interface CarHeaderProps {
  car: Car;
}

export const CarHeader = ({ car }: CarHeaderProps) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold mb-2 text-automotive-800">
        {car.brand} {car.model} {car.year}
      </h1>
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-2xl font-bold text-automotive-700">
          {formatPrice(car.price)}
        </span>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
          car.stock > 0 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {car.stock > 0 ? `${car.stock} disponibles` : 'No disponible'}
        </span>
      </div>
    </div>
  );
};
