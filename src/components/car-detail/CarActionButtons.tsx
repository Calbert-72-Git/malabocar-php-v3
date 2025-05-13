
import React from 'react';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { Car } from '../../types/car';
import { WhatsAppButton } from './WhatsAppButton';

interface CarActionButtonsProps {
  car: Car;
  onAddToCart: () => void;
  onOrder: () => void;
}

export const CarActionButtons = ({ car, onAddToCart, onOrder }: CarActionButtonsProps) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          onClick={onAddToCart}
          disabled={car.stock === 0}
          className="flex-1 bg-automotive-600 hover:bg-automotive-700 shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
          aria-label="Añadir al carrito"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Añadir al carrito
        </Button>
        
        <WhatsAppButton car={car} withDetails={true} />
      </div>
      
      <Button
        onClick={onOrder}
        disabled={car.stock === 0}
        variant="outline"
        className="w-full border-automotive-600 text-automotive-700 hover:bg-automotive-50 transition-all hover:shadow-md"
        aria-label="Hacer un encargo"
      >
        Hacer un encargo
      </Button>
    </>
  );
};
