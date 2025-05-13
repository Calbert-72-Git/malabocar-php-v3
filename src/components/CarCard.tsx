
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types/car';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { addToCart } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="car-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="car-image-container h-48">
        <img
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
        <p className="text-sm text-gray-500">{car.year}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-semibold text-automotive-700">
            {formatPrice(car.price)}
          </span>
          <span className={`text-sm ${car.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {car.stock > 0 ? `${car.stock} disponibles` : 'No disponible'}
          </span>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button 
            asChild 
            className="flex-1"
            variant="outline"
          >
            <Link to={`/car/${car.id}`}>Ver detalles</Link>
          </Button>
          <Button 
            onClick={() => addToCart(car)}
            disabled={car.stock === 0}
            className="bg-automotive-600 hover:bg-automotive-700"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Añadir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
