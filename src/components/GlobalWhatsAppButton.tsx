
import React from 'react';
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface GlobalWhatsAppButtonProps {
  variant?: 'default' | 'floating';
}

export const GlobalWhatsAppButton = ({ variant = 'floating' }: GlobalWhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hola, estoy interesado en obtener más información sobre vuestros vehículos y servicios.`
    );
    
    const whatsappUrl = `https://wa.me/+34600000000?text=${message}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Abriendo WhatsApp...', {
      description: 'Te conectaremos con nuestro equipo de ventas.'
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
      className="bg-green-600 hover:bg-green-700 shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
    >
      <MessageCircle className="mr-2 h-5 w-5" />
      WhatsApp
    </Button>
  );
};

export default GlobalWhatsAppButton;
