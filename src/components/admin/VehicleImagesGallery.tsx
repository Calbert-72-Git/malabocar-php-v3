
import React from 'react';
import { FormDescription } from '../ui/form';
import VehicleImageUpload from './VehicleImageUpload';
import { Control } from 'react-hook-form';

interface VehicleImagesGalleryProps {
  control: Control<any>;
}

const VehicleImagesGallery = ({ control }: VehicleImagesGalleryProps) => {
  return (
    <div className="bg-muted/50 p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Imágenes del vehículo</h3>
      <div className="space-y-6">
        <VehicleImageUpload 
          control={control} 
          name="image1" 
          label="Imagen principal"
          placeholder="URL de la imagen (ej. https://images.unsplash.com/...)"
          required={true}
        />

        <VehicleImageUpload 
          control={control} 
          name="image2" 
          label="Imagen secundaria 1"
          placeholder="URL de la imagen (opcional)"
        />

        <VehicleImageUpload 
          control={control} 
          name="image3" 
          label="Imagen secundaria 2"
          placeholder="URL de la imagen (opcional)"
        />

        <FormDescription className="text-sm text-muted-foreground">
          Puedes utilizar URLs de imágenes desde servicios como Unsplash, ImgBB, o subir imágenes directamente desde tu dispositivo.
          Las imágenes subidas se convertirán automáticamente al formato adecuado.
        </FormDescription>
      </div>
    </div>
  );
};

export default VehicleImagesGallery;
