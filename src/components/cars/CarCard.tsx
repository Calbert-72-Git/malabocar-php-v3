
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '@/types/car';
import { formatPrice } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ShareVehicleButton } from '@/components/car-detail/ShareVehicleButton';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();
  
  return (
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
};
