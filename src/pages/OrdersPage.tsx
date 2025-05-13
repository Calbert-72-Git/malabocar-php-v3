import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

const OrdersPage = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    comments: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    postalCode: false,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: false
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('La imagen es demasiado grande. Máximo 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('Imagen cargada correctamente');
    }
  };
  
  const validateForm = () => {
    const errors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email || !/^\S+@\S+\.\S+$/.test(formData.email),
      phone: !formData.phone,
      address: !formData.address,
      city: !formData.city,
      postalCode: !formData.postalCode,
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, complete todos los campos requeridos correctamente.');
      return;
    }
    
    // Here you would normally send the order to a backend
    // For this example, we'll just show a success message
    toast.success('¡Su pedido ha sido enviado con éxito! Nos pondremos en contacto pronto.');
    clearCart();
    navigate('/');
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Realizar Pedido</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Información de contacto</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="mb-1 block">Nombre *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={formErrors.firstName ? 'border-red-500' : ''}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1">Campo requerido</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="mb-1 block">Apellidos *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={formErrors.lastName ? 'border-red-500' : ''}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1">Campo requerido</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="mb-1 block">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? 'border-red-500' : ''}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">Correo electrónico inválido</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-1 block">Teléfono *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? 'border-red-500' : ''}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">Campo requerido</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address" className="mb-1 block">Dirección *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={formErrors.address ? 'border-red-500' : ''}
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-sm mt-1">Campo requerido</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="city" className="mb-1 block">Ciudad *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={formErrors.city ? 'border-red-500' : ''}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-sm mt-1">Campo requerido</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="mb-1 block">Código Postal *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={formErrors.postalCode ? 'border-red-500' : ''}
                    />
                    {formErrors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">Campo requerido</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="vehicleImage" className="mb-1 block">Imagen de muestra del vehículo</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-4">
                      <Label 
                        htmlFor="vehicleImage" 
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      >
                        <Upload size={18} />
                        Subir imagen
                      </Label>
                      <Input
                        id="vehicleImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {imagePreview && (
                        <span className="text-green-600 text-sm">Imagen cargada</span>
                      )}
                    </div>
                    
                    {imagePreview && (
                      <div className="relative mt-2 max-w-md">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="rounded-md max-h-48 object-contain border border-gray-200"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          onClick={() => setImagePreview(null)}
                        >
                          <span className="sr-only">Eliminar</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Opcional. Formatos: JPG, PNG. Máximo 5MB.</p>
                </div>
                
                <div>
                  <Label htmlFor="comments" className="mb-1 block">Comentarios adicionales</Label>
                  <Textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Si desea especificar algún detalle sobre su pedido o encargo especial, escríbalo aquí..."
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    Confirmar pedido
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen del pedido</h2>
              
              {cartItems.length > 0 ? (
                <>
                  <ul className="divide-y divide-gray-200 mb-4">
                    {cartItems.map((item) => (
                      <li key={item.car.id} className="py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={item.car.images[0]}
                            alt={`${item.car.brand} ${item.car.model}`}
                            className="w-12 h-12 object-cover rounded-md mr-4"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.car.brand} {item.car.model}
                            </p>
                            <p className="text-sm text-gray-500">
                              Cantidad: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(item.car.price * item.quantity)}
                        </p>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t border-gray-200 py-4 flex justify-between">
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-lg font-medium text-red-700">
                      {formatPrice(getCartTotal() * 1.21)}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No hay vehículos en su carrito.</p>
                  <Button 
                    asChild
                    className="mt-4 bg-red-600 hover:bg-red-700"
                  >
                    <a href="/cars">Ver catálogo</a>
                  </Button>
                </div>
              )}
              
              <div className="mt-2">
                <p className="text-sm text-gray-500 italic">
                  * El pedido estará sujeto a disponibilidad y verificación. Nos pondremos en contacto con usted para confirmar los detalles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
