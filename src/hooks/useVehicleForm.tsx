
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { getCarById, updateCar, processImageUpload, generateCarId } from '../data/carService';
import { Car } from '../types/car';

// Schema de validación para el formulario
const vehicleFormSchema = z.object({
  brand: z.string().min(1, { message: 'La marca es requerida' }),
  model: z.string().min(1, { message: 'El modelo es requerido' }),
  year: z.coerce.number().int().min(1900, { message: 'Año inválido' }).max(2100, { message: 'Año inválido' }),
  price: z.coerce.number().min(0, { message: 'El precio debe ser positivo' }),
  description: z.string().min(10, { message: 'La descripción debe tener al menos 10 caracteres' }),
  stock: z.coerce.number().int().min(0, { message: 'El stock debe ser positivo o cero' }),
  engine: z.string().min(1, { message: 'El motor es requerido' }),
  transmission: z.string().min(1, { message: 'La transmisión es requerida' }),
  fuelType: z.string().min(1, { message: 'El tipo de combustible es requerido' }),
  mileage: z.coerce.number().min(0, { message: 'El kilometraje debe ser positivo o cero' }),
  exteriorColor: z.string().min(1, { message: 'El color exterior es requerido' }),
  interiorColor: z.string().min(1, { message: 'El color interior es requerido' }),
  image1: z.string().min(1, { message: 'La imagen principal es requerida' }),
  image2: z.string().optional(),
  image3: z.string().optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export const useVehicleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<Car | null>(null);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      description: '',
      stock: 0,
      engine: '',
      transmission: '',
      fuelType: '',
      mileage: 0,
      exteriorColor: '',
      interiorColor: '',
      image1: '',
      image2: '',
      image3: '',
    },
  });

  useEffect(() => {
    if (id && id !== 'new') {
      const foundVehicle = getCarById(id);
      if (foundVehicle) {
        setVehicle(foundVehicle);
        form.reset({
          brand: foundVehicle.brand,
          model: foundVehicle.model,
          year: foundVehicle.year,
          price: foundVehicle.price,
          description: foundVehicle.description,
          stock: foundVehicle.stock,
          engine: foundVehicle.specs.engine,
          transmission: foundVehicle.specs.transmission,
          fuelType: foundVehicle.specs.fuelType,
          mileage: foundVehicle.specs.mileage,
          exteriorColor: foundVehicle.specs.exteriorColor,
          interiorColor: foundVehicle.specs.interiorColor,
          image1: foundVehicle.images[0] || '',
          image2: foundVehicle.images[1] || '',
          image3: foundVehicle.images[2] || '',
        });
      } else {
        toast.error("Vehículo no encontrado");
        navigate('/admin/vehicles');
      }
    }
  }, [id, navigate, form]);

  const onSubmit = async (data: VehicleFormValues) => {
    setIsLoading(true);
    
    try {
      // Procesar imágenes
      const processedImages = [
        data.image1 ? processImageUpload(data.image1) : '',
        data.image2 ? processImageUpload(data.image2) : '',
        data.image3 ? processImageUpload(data.image3) : '',
      ].filter(Boolean);
      
      // Crear el objeto del coche actualizado
      const updatedVehicle: Car = {
        id: id === 'new' ? generateCarId() : (vehicle?.id || ''),
        brand: data.brand,
        model: data.model,
        year: data.year,
        price: data.price,
        description: data.description,
        stock: data.stock,
        images: processedImages,
        features: vehicle?.features || [],
        specs: {
          engine: data.engine,
          transmission: data.transmission,
          fuelType: data.fuelType,
          mileage: data.mileage,
          exteriorColor: data.exteriorColor,
          interiorColor: data.interiorColor,
        }
      };
      
      // Actualizar o agregar el coche
      const success = updateCar(updatedVehicle);
      
      if (success) {
        toast.success(id === 'new' 
          ? '¡Vehículo creado correctamente!' 
          : '¡Vehículo actualizado correctamente!');
        navigate('/admin/vehicles');
      } else {
        toast.error('Ocurrió un error al guardar el vehículo');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Ocurrió un error al procesar la solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    vehicle,
    id,
    onSubmit,
    navigate
  };
};
