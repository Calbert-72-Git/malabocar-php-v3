import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getCarById } from '../data/cars';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { ShoppingCart, ChevronLeft, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '../components/ui/card';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { cn } from '../lib/utils';

// Nuevo componente para el botón de WhatsApp flotante
const WhatsAppFloatingButton = ({ car }: { car: any }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsAppClick = () => {
    // Crear el mensaje con los detalles del coche y la imagen
    const carUrl = window.location.href;
    const message = encodeURIComponent(
      `Hola, estoy interesado en el vehículo ${car.brand} ${car.model} (${car.year}) con precio ${formatPrice(car.price)}. \n\nDetalles del vehículo: ${carUrl}`
    );
    const whatsappUrl = `https://wa.me/+34600000000?text=${message}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Abriendo WhatsApp...');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        onClick={handleWhatsAppClick}
        size="lg"
        className="rounded-full bg-green-600 hover:bg-green-700 animate-fade-in shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <MessageCircle className="mr-2 h-5 w-5" /> 
        Consultar por WhatsApp
      </Button>
    </div>
  );
};

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
    toast.success('Se ha añadido el vehículo al carrito');
  };
  
  const handleOrder = () => {
    addToCart(car);
    toast.success('Se ha añadido el vehículo al carrito');
    navigate('/orders');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, estoy interesado en el vehículo ${car.brand} ${car.model} (${car.year}) con precio ${formatPrice(car.price)}. ¿Podría darme más información?`
    );
    const whatsappUrl = `https://wa.me/+34600000000?text=${message}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Abriendo WhatsApp...');
  };

  // Función mejorada para compartir por WhatsApp con imagen
  const handleWhatsAppWithImage = () => {
    // No podemos adjuntar directamente la imagen en WhatsApp mediante URL,
    // pero podemos crear un mensaje que incluya los detalles y mencionar que hay fotos disponibles
    const carUrl = window.location.href;
    const message = encodeURIComponent(
      `Hola, estoy interesado en el vehículo ${car.brand} ${car.model} (${car.year}) con precio ${formatPrice(car.price)}.\n\n` +
      `Especificaciones:\n` +
      `- Motor: ${car.specs.engine}\n` +
      `- Transmisión: ${car.specs.transmission}\n` +
      `- Combustible: ${car.specs.fuelType}\n` +
      `- Kilometraje: ${car.specs.mileage.toLocaleString()} km\n\n` +
      `Puede ver las fotos y más detalles aquí: ${carUrl}\n\n` +
      `¿Podría darme más información sobre este vehículo?`
    );
    const whatsappUrl = `https://wa.me/+34600000000?text=${message}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Abriendo WhatsApp con la información del vehículo', {
      description: 'Incluye enlace a las imágenes y especificaciones.'
    });
  };
  
  return (
    <Layout>
      {/* Añadimos el botón flotante de WhatsApp */}
      <WhatsAppFloatingButton car={car} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6 flex items-center text-automotive-600 transition-all hover:translate-x-[-5px]"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Volver
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="mb-4">
                <AspectRatio ratio={4/3}>
                  <img
                    src={car.images[activeImageIndex]}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </AspectRatio>
              </div>
              
              <div className="grid grid-cols-3 gap-2 p-4">
                {car.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:opacity-100",
                      index === activeImageIndex 
                        ? "ring-2 ring-automotive-600 scale-[0.98]" 
                        : "opacity-70 hover:scale-95"
                    )}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <AspectRatio ratio={4/3}>
                      <img
                        src={image}
                        alt={`${car.brand} ${car.model} - Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Details Section */}
          <div className="space-y-6">
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
            
            <div className="prose prose-sm">
              <p>{car.description}</p>
            </div>
            
            {/* Specs */}
            <Card className="bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
              <CardContent className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">Especificaciones</h2>
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
              </CardContent>
            </Card>
            
            {/* Features */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Características</h2>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                {car.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center transition-transform duration-300 hover:translate-x-1">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={car.stock === 0}
                className="flex-1 bg-automotive-600 hover:bg-automotive-700 shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
                aria-label="Añadir al carrito"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al carrito
              </Button>
              <Button
                onClick={handleWhatsAppWithImage}
                className="flex-1 bg-green-600 hover:bg-green-700 shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
                aria-label="Contactar por WhatsApp con imagen"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp con detalles
              </Button>
            </div>
            <Button
              onClick={handleOrder}
              disabled={car.stock === 0}
              variant="outline"
              className="w-full border-automotive-600 text-automotive-700 hover:bg-automotive-50 transition-all hover:shadow-md"
              aria-label="Hacer un encargo"
            >
              Hacer un encargo
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetailPage;
