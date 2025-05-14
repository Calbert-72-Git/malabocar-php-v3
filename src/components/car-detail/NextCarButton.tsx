
import React from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { Car } from '../../types/car';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface NextCarButtonProps {
  currentCarId: string;
  nextCarId?: string;
}

export const NextCarButton = ({ currentCarId, nextCarId }: NextCarButtonProps) => {
  const navigate = useNavigate();

  const handleNextCarClick = () => {
    if (nextCarId) {
      navigate(`/car/${nextCarId}`);
      // No es necesario usar window.scrollTo aquí, lo haremos en el Layout
      toast.info('Cargando siguiente vehículo...');
    } else {
      toast.info('Este es el último vehículo disponible');
    }
  };

  if (!nextCarId) {
    return null;
  }

  return (
    <Button
      onClick={handleNextCarClick}
      className="fixed top-1/2 right-4 transform -translate-y-1/2 rounded-full shadow-lg hover:shadow-xl z-40 bg-automotive-600 hover:bg-automotive-700"
      size="icon"
      aria-label="Ver siguiente vehículo"
    >
      <ChevronRight className="h-6 w-6" />
    </Button>
  );
};
