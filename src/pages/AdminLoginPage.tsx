
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema de validación para el formulario
const formSchema = z.object({
  username: z.string().min(1, { message: 'El nombre de usuario es requerido' }),
  password: z.string().min(1, { message: 'La contraseña es requerida' }),
});

// Define el administrador predeterminado
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'admin123'
};

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Configurar el formulario con React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulamos una pequeña demora para dar sensación de procesamiento
    setTimeout(() => {
      if (data.username === DEFAULT_ADMIN.username && data.password === DEFAULT_ADMIN.password) {
        // Guardar estado de autenticación en sessionStorage
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        toast.success('Inicio de sesión exitoso');
        navigate('/admin/dashboard');
      } else {
        toast.error('Credenciales incorrectas');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh] px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Acceso Administrador</CardTitle>
            <CardDescription>
              Ingrese sus credenciales para acceder al panel de administración.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-automotive-600 hover:bg-automotive-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>Usuario predeterminado: <strong>admin</strong> / Contraseña: <strong>admin123</strong></p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLoginPage;
