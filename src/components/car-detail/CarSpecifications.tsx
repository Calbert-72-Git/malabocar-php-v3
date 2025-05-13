
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Car } from '../../types/car';

interface CarSpecificationsProps {
  specs: Car['specs'];
}

export const CarSpecifications = ({ specs }: CarSpecificationsProps) => {
  return (
    <Card className="bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Especificaciones</h2>
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <p className="text-sm text-gray-500">Motor</p>
            <p className="font-medium">{specs.engine}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Transmisión</p>
            <p className="font-medium">{specs.transmission}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Combustible</p>
            <p className="font-medium">{specs.fuelType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Kilometraje</p>
            <p className="font-medium">{specs.mileage.toLocaleString()} km</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Color exterior</p>
            <p className="font-medium">{specs.exteriorColor}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Color interior</p>
            <p className="font-medium">{specs.interiorColor}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
