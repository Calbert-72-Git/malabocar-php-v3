
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AdminAuth from '../components/admin/AdminAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { getAllCars } from '../data/cars';
import { Car } from '../types/car';
import { formatPrice } from '../utils/formatters';
import { toast } from 'sonner';

const AdminVehiclesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState<Car[]>(getAllCars());

  const filteredVehicles = vehicles.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminAuth>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestión de Vehículos</h1>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/dashboard')}
            >
              Volver al panel
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Input
                placeholder="Buscar por marca o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Button 
                className="bg-automotive-600 hover:bg-automotive-700"
                onClick={() => navigate('/admin/vehicles/new')}
              >
                Agregar vehículo
              </Button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Año</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.id}</TableCell>
                      <TableCell>
                        <div className="h-14 w-20 overflow-hidden rounded-md">
                          <img 
                            src={vehicle.images[0]} 
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{vehicle.brand}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>{formatPrice(vehicle.price)}</TableCell>
                      <TableCell>{vehicle.stock}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/admin/vehicles/edit/${vehicle.id}`)}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => toast.info('Funcionalidad para eliminar vehículos en desarrollo')}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No se encontraron vehículos que coincidan con la búsqueda
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Layout>
    </AdminAuth>
  );
};

export default AdminVehiclesPage;
