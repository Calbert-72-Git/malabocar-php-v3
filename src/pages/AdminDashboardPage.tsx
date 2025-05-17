
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AdminAuth from '../components/admin/AdminAuth';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    toast.success('Sesión cerrada correctamente');
    navigate('/admin/login');
  };

  return (
    <AdminAuth>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50" 
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Gestión de Vehículos</CardTitle>
                <CardDescription>Administra la información e imágenes de los vehículos</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Aquí puedes editar la información completa de los vehículos, incluidas las imágenes.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-automotive-600 hover:bg-automotive-700"
                  onClick={() => navigate('/admin/vehicles')}
                >
                  Administrar vehículos
                </Button>
              </CardFooter>
            </Card>
            
            {/* Otras tarjetas de administración podrían agregarse aquí */}
          </div>
        </div>
      </Layout>
    </AdminAuth>
  );
};

export default AdminDashboardPage;
