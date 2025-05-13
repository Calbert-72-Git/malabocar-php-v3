
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getCarById } from '../data/cars';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

// Importando los nuevos componentes refactorizados
import { WhatsAppButton } from '../components/car-detail/WhatsAppButton';
import { CarImageGallery } from '../components/car-detail/CarImageGallery';
import { CarSpecifications } from '../components/car-detail/CarSpecifications';
import { CarFeatures } from '../components/car-detail/CarFeatures';
import { CarActionButtons } from '../components/car-detail/CarActionButtons';
import { CarHeader } from '../components/car-detail/CarHeader';

// Importando la función de utilidad
import { formatPrice } from '../utils/formatters';

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
  
  const handleAddToCart = () => {
    addToCart(car);
    toast.success('Se ha añadido el vehículo al carrito');
  };
  
  const handleOrder = () => {
    addToCart(car);
    toast.success('Se ha añadido el vehículo al carrito');
    navigate('/orders');
  };

  return (
    <Layout>
      {/* Botón flotante de WhatsApp */}
      <WhatsAppButton car={car} variant="floating" />
      
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
          {/* Sección de imágenes */}
          <CarImageGallery
            images={car.images}
            brand={car.brand}
            model={car.model}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
          />
          
          {/* Sección de detalles */}
          <div className="space-y-6">
            {/* Encabezado del coche */}
            <CarHeader car={car} formatPrice={formatPrice} />
            
            {/* Descripción */}
            <div className="prose prose-sm">
              <p>{car.description}</p>
            </div>
            
            {/* Especificaciones */}
            <CarSpecifications specs={car.specs} />
            
            {/* Características */}
            <CarFeatures features={car.features} />
            
            {/* Botones de acción */}
            <CarActionButtons 
              car={car}
              onAddToCart={handleAddToCart}
              onOrder={handleOrder}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetailPage;
