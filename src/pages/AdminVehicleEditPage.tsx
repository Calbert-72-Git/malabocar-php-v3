
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import AdminAuth from '../components/admin/AdminAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { getCarById } from '../data/cars';
import { Car } from '../types/car';
import { Upload } from 'lucide-react';

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
  // Agregamos validación para imágenes
  image1: z.string().min(1, { message: 'La imagen principal es requerida' }),
  image2: z.string().optional(),
  image3: z.string().optional(),
  // Podemos agregar validación para características si se desea
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

const AdminVehicleEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState<Car | null>(null);
  const [imagePreview1, setImagePreview1] = useState<string | null>(null);
  const [imagePreview2, setImagePreview2] = useState<string | null>(null);
  const [imagePreview3, setImagePreview3] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundVehicle = getCarById(id);
      if (foundVehicle) {
        setVehicle(foundVehicle);
      } else {
        toast.error("Vehículo no encontrado");
        navigate('/admin/vehicles');
      }
    }
  }, [id, navigate]);

  // Configurar el formulario con React Hook Form
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      brand: vehicle?.brand || '',
      model: vehicle?.model || '',
      year: vehicle?.year || new Date().getFullYear(),
      price: vehicle?.price || 0,
      description: vehicle?.description || '',
      stock: vehicle?.stock || 0,
      engine: vehicle?.specs.engine || '',
      transmission: vehicle?.specs.transmission || '',
      fuelType: vehicle?.specs.fuelType || '',
      mileage: vehicle?.specs.mileage || 0,
      exteriorColor: vehicle?.specs.exteriorColor || '',
      interiorColor: vehicle?.specs.interiorColor || '',
      image1: vehicle?.images[0] || '',
      image2: vehicle?.images[1] || '',
      image3: vehicle?.images[2] || '',
    },
  });

  // Actualizar el formulario cuando se carga el vehículo
  useEffect(() => {
    if (vehicle) {
      form.reset({
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        description: vehicle.description,
        stock: vehicle.stock,
        engine: vehicle.specs.engine,
        transmission: vehicle.specs.transmission,
        fuelType: vehicle.specs.fuelType,
        mileage: vehicle.specs.mileage,
        exteriorColor: vehicle.specs.exteriorColor,
        interiorColor: vehicle.specs.interiorColor,
        image1: vehicle.images[0] || '',
        image2: vehicle.images[1] || '',
        image3: vehicle.images[2] || '',
      });
    }
  }, [vehicle, form]);

  // Función para manejar la carga de archivos
  const handleFileUpload = (fieldName: 'image1' | 'image2' | 'image3', file: File) => {
    if (!file) return;
    
    // Verificamos que sea una imagen
    if (!file.type.startsWith('image/')) {
      toast.error('El archivo debe ser una imagen');
      return;
    }
    
    // Convertimos la imagen a una URL de datos para previsualización
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      
      // Actualizamos la previsualización dependiendo del campo
      if (fieldName === 'image1') setImagePreview1(result);
      if (fieldName === 'image2') setImagePreview2(result);
      if (fieldName === 'image3') setImagePreview3(result);
      
      // Establecemos el valor en el formulario
      form.setValue(fieldName, result);
    };
    
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: VehicleFormValues) => {
    setIsLoading(true);
    
    // Simulamos una pequeña demora para dar sensación de procesamiento
    setTimeout(() => {
      console.log('Datos actualizados:', data);
      
      // En una aplicación real, aquí se guardarían los datos en la base de datos
      // Como estamos trabajando con datos en memoria, mostramos un mensaje de éxito
      toast.success('¡Vehículo actualizado correctamente!');
      navigate('/admin/vehicles');
      
      setIsLoading(false);
    }, 1000);
  };

  if (!vehicle && id !== 'new') {
    return (
      <AdminAuth>
        <Layout>
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h2 className="text-xl">Cargando información del vehículo...</h2>
            </div>
          </div>
        </Layout>
      </AdminAuth>
    );
  }

  return (
    <AdminAuth>
      <Layout>
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {id === 'new' ? 'Crear Nuevo Vehículo' : 'Editar Vehículo'}
            </h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/vehicles')}
            >
              Cancelar y volver
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marca</FormLabel>
                          <FormControl>
                            <Input placeholder="Mercedes-Benz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modelo</FormLabel>
                          <FormControl>
                            <Input placeholder="C-Class" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Año</FormLabel>
                          <FormControl>
                            <Input type="number" min="1900" max="2100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio (€)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ingrese una descripción detallada del vehículo..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Especificaciones técnicas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="engine"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Motor</FormLabel>
                            <FormControl>
                              <Input placeholder="2.0L Turbocharged I4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transmisión</FormLabel>
                            <FormControl>
                              <Input placeholder="9-Speed Automatic" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fuelType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de combustible</FormLabel>
                            <FormControl>
                              <Input placeholder="Gasoline" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mileage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kilometraje</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="exteriorColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color exterior</FormLabel>
                            <FormControl>
                              <Input placeholder="Polar White" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="interiorColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color interior</FormLabel>
                            <FormControl>
                              <Input placeholder="Black" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Imágenes del vehículo</h3>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="image1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imagen principal</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                  <Input
                                    placeholder="URL de la imagen (ej. https://images.unsplash.com/...)"
                                    className="flex-grow"
                                    {...field}
                                  />
                                  <div className="relative">
                                    <input
                                      type="file"
                                      id="upload-image1"
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          handleFileUpload('image1', e.target.files[0]);
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
                                      Subir imagen
                                    </Button>
                                  </div>
                                </div>
                                {(field.value || imagePreview1) && (
                                  <div className="h-40 w-full overflow-hidden rounded-md border">
                                    <img
                                      src={imagePreview1 || field.value}
                                      alt="Imagen principal"
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
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="image2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imagen secundaria 1</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                  <Input
                                    placeholder="URL de la imagen (opcional)"
                                    className="flex-grow"
                                    {...field}
                                    value={field.value || ''}
                                  />
                                  <div className="relative">
                                    <input
                                      type="file"
                                      id="upload-image2"
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          handleFileUpload('image2', e.target.files[0]);
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
                                      Subir imagen
                                    </Button>
                                  </div>
                                </div>
                                {(field.value || imagePreview2) && (
                                  <div className="h-40 w-full overflow-hidden rounded-md border">
                                    <img
                                      src={imagePreview2 || field.value}
                                      alt="Imagen secundaria 1"
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
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="image3"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imagen secundaria 2</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                  <Input
                                    placeholder="URL de la imagen (opcional)"
                                    className="flex-grow"
                                    {...field}
                                    value={field.value || ''}
                                  />
                                  <div className="relative">
                                    <input
                                      type="file"
                                      id="upload-image3"
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          handleFileUpload('image3', e.target.files[0]);
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
                                      Subir imagen
                                    </Button>
                                  </div>
                                </div>
                                {(field.value || imagePreview3) && (
                                  <div className="h-40 w-full overflow-hidden rounded-md border">
                                    <img
                                      src={imagePreview3 || field.value}
                                      alt="Imagen secundaria 2"
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
                        )}
                      />

                      <FormDescription className="text-sm text-muted-foreground">
                        Puedes utilizar URLs de imágenes desde servicios como Unsplash, ImgBB o subir imágenes directamente desde tu dispositivo.
                      </FormDescription>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/admin/vehicles')}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-automotive-600 hover:bg-automotive-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Guardando...' : id === 'new' ? 'Crear vehículo' : 'Actualizar vehículo'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </AdminAuth>
  );
};

export default AdminVehicleEditPage;
