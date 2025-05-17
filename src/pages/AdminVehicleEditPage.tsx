
import React from 'react';
import Layout from '../components/Layout';
import AdminAuth from '../components/admin/AdminAuth';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Form } from '../components/ui/form';
import VehicleBasicInfo from '../components/admin/VehicleBasicInfo';
import VehicleSpecifications from '../components/admin/VehicleSpecifications';
import VehicleImagesGallery from '../components/admin/VehicleImagesGallery';
import { useVehicleForm } from '../hooks/useVehicleForm';

const AdminVehicleEditPage = () => {
  const { 
    form, 
    isLoading, 
    vehicle, 
    id, 
    onSubmit, 
    navigate 
  } = useVehicleForm();

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
                  {/* Información básica del vehículo */}
                  <VehicleBasicInfo control={form.control} />
                  
                  {/* Especificaciones técnicas */}
                  <VehicleSpecifications control={form.control} />
                  
                  {/* Galería de imágenes */}
                  <VehicleImagesGallery control={form.control} />

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
                      {isLoading 
                        ? 'Guardando...' 
                        : id === 'new' ? 'Crear vehículo' : 'Actualizar vehículo'
                      }
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
