
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getCarById } from '../data/cars';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const car = getCarById(id || '');
  
  if (!car) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Vehículo no encontrado</h1>
          <p className="mb-8">El vehículo que busca no existe o ha sido eliminado.</p>
          <Button onClick={() => navigate('/cars')} className="bg-automotive-600 hover:bg-automotive-700">
            Volver al catálogo
          </Button>
        </div>
      </Layout>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  const handleAddToCart = () => {
    addToCart(car);
  };
  
  const handleOrder = () => {
    addToCart(car);
    toast.success('Se ha añadido el vehículo al carrito');
    navigate('/orders');
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6 flex items-center text-automotive-600"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Volver
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[4/3]">
              <img
                src={car.images[activeImageIndex]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {car.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden ${
                    index === activeImageIndex ? 'ring-2 ring-automotive-600' : ''
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${car.brand} ${car.model} - Vista ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Details Section */}
          <div>
            <h1 className="text-3xl font-bold mb-2">
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
            
            <div className="prose prose-sm mb-6">
              <p>{car.description}</p>
            </div>
            
            {/* Specs */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">Especificaciones</h2>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Motor</p>
                  <p className="font-medium">{car.specs.engine}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transmisión</p>
                  <p className="font-medium">{car.specs.transmission}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Combustible</p>
                  <p className="font-medium">{car.specs.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kilometraje</p>
                  <p className="font-medium">{car.specs.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color exterior</p>
                  <p className="font-medium">{car.specs.exteriorColor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color interior</p>
                  <p className="font-medium">{car.specs.interiorColor}</p>
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Características</h2>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={car.stock === 0}
                className="flex-1 bg-automotive-600 hover:bg-automotive-700"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al carrito
              </Button>
              <Button
                onClick={handleOrder}
                disabled={car.stock === 0}
                variant="outline"
                className="flex-1"
              >
                Hacer un encargo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetailPage;
