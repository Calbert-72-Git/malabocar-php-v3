

import React from 'react';
import { Button } from '../ui/button';
import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Car } from '../../types/car';

interface WhatsAppButtonProps {
  car: Car;
  variant?: 'default' | 'floating';
  withDetails?: boolean;
}

export const WhatsAppButton = ({ car, variant = 'default', withDetails = false }: WhatsAppButtonProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsAppClick = () => {
    // Crear el mensaje con los detalles del coche
    const carUrl = window.location.href;
    
    let message;
    if (withDetails) {
      message = encodeURIComponent(
        `Hola, estoy interesado en el vehículo ${car.brand} ${car.model} (${car.year}) con precio ${formatPrice(car.price)}.\n\n` +
        `Especificaciones:\n` +
        `- Motor: ${car.specs.engine}\n` +
        `- Transmisión: ${car.specs.transmission}\n` +
        `- Combustible: ${car.specs.fuelType}\n` +
        `- Kilometraje: ${car.specs.mileage.toLocaleString()} km\n\n` +
        `Puede ver las fotos y más detalles aquí: ${carUrl}\n\n` +
        `¿Podría darme más información sobre este vehículo?`
      );
    } else {
      message = encodeURIComponent(
        `Hola, estoy interesado en el vehículo ${car.brand} ${car.model} (${car.year}) con precio ${formatPrice(car.price)}. ¿Podría darme más información?`
      );
    }
    
    const whatsappUrl = `https://wa.me/+34600000000?text=${message}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Abriendo WhatsApp' + (withDetails ? ' con la información del vehículo' : '...'), {
      description: withDetails ? 'Incluye enlace a las imágenes y especificaciones.' : undefined
    });
  };

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={handleWhatsAppClick}
          size="icon"
          className="rounded-full bg-green-600 hover:bg-green-700 animate-fade-in shadow-lg h-12 w-12 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          aria-label="Consultar por WhatsApp"
        >
          <MessageCircle className="h-6 w-6" /> 
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="flex-1 bg-green-600 hover:bg-green-700 shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="mr-2 h-5 w-5" />
      WhatsApp {withDetails ? 'con detalles' : ''}
    </Button>
  );
};

