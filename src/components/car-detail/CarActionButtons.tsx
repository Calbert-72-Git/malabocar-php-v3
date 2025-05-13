
import React from 'react';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { Car } from '../../types/car';
import { WhatsAppButton } from './WhatsAppButton';
import { ShareVehicleButton } from './ShareVehicleButton';

interface CarActionButtonsProps {
  car: Car;
  onAddToCart: () => void;
  onOrder: () => void;
}

export const CarActionButtons = ({ car, onAddToCart, onOrder }: CarActionButtonsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={onAddToCart}
          className="flex-1 bg-automotive-600 hover:bg-automotive-700 shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
          disabled={car.stock === 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Añadir al carrito
        </Button>
        <Button
          onClick={onOrder}
          className="flex-1 bg-automotive-700 hover:bg-automotive-800 shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
          disabled={car.stock === 0}
        >
          Pedir ahora
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <WhatsAppButton car={car} withDetails={true} />
        <ShareVehicleButton car={car} />
      </div>
    </div>
  );
};
