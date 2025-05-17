
import React, { useState, useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Upload, Trash2 } from 'lucide-react';
import { Control } from 'react-hook-form';

interface VehicleImageUploadProps {
  control: Control<any>;
  name: 'image1' | 'image2' | 'image3';
  label: string;
  placeholder: string;
  required?: boolean;
}

const VehicleImageUpload = ({ 
  control, 
  name, 
  label, 
  placeholder, 
  required = false 
}: VehicleImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = (file: File, onChange: (value: string) => void) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      console.error('El archivo debe ser una imagen');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      onChange(result); // Actualiza el valor del campo con la imagen en base64
    };
    
    reader.readAsDataURL(file);
  };

  const handleClearImage = (onChange: (value: string) => void) => {
    setImagePreview(null);
    onChange('');
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Actualiza la vista previa cuando cambia el valor del campo
        useEffect(() => {
          if (field.value && !field.value.startsWith('data:') && !imagePreview) {
            setImagePreview(field.value);
          }
        }, [field.value]);

        return (
          <FormItem>
            <FormLabel>{label}{required && ' *'}</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <Input
                    placeholder={placeholder}
                    className="flex-grow"
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      if (e.target.value && !e.target.value.startsWith('data:')) {
                        setImagePreview(e.target.value);
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <div className="relative">
                      <input
                        type="file"
                        id={`upload-${name}`}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], field.onChange);
                          }
                        }}
                        accept="image/*"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Subir
                      </Button>
                    </div>
                    {(field.value || imagePreview) && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleClearImage(field.onChange)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                {(field.value || imagePreview) && (
                  <div className="h-40 w-full overflow-hidden rounded-md border">
                    <img
                      src={imagePreview || field.value}
                      alt={`Previsualización para ${label}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                      }}
                    />
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  );
};

export default VehicleImageUpload;
