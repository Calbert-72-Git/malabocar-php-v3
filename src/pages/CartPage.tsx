
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Trash2, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { formatPrice } from '../utils/formatters';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/orders');
  };
  
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Su carrito está vacío</h1>
          <p className="mb-8 text-gray-500">Parece que aún no ha agregado ningún coche a su carrito.</p>
          <Button asChild className="bg-automotive-600 hover:bg-automotive-700">
            <Link to="/cars">Ver catálogo</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Carrito de compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.car.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="flex-shrink-0 sm:w-32 sm:h-32 mb-4 sm:mb-0">
                        <img
                          src={item.car.images[0]}
                          alt={`${item.car.brand} ${item.car.model}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 sm:ml-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="text-lg font-medium">
                              <Link
                                to={`/car/${item.car.id}`}
                                className="text-gray-900 hover:text-automotive-700"
                              >
                                {item.car.brand} {item.car.model}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">{item.car.year}</p>
                          </div>
                          <p className="mt-2 sm:mt-0 text-lg font-medium text-automotive-700">
                            {formatPrice(item.car.price)}
                          </p>
                        </div>
                        
                        {/* Quantity and Actions */}
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.car.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50"
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                            <span className="mx-2 text-gray-700">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.car.id, item.quantity + 1)}
                              disabled={item.quantity >= item.car.stock}
                              className="p-1 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.car.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Clear cart button */}
              <div className="p-4 border-t border-gray-200 flex justify-end">
                <Button 
                  variant="ghost" 
                  onClick={clearCart} 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Vaciar carrito
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen de la orden</h2>
              
              <div className="flow-root">
                <div className="-my-4 divide-y divide-gray-200">
                  <div className="py-4 flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">{formatPrice(getCartTotal())}</p>
                  </div>
                  <div className="py-4 flex justify-between">
                    <p className="text-gray-600">Impuestos</p>
                    <p className="font-medium">{formatPrice(getCartTotal() * 0.21)}</p>
                  </div>
                  <div className="py-4 flex justify-between">
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-lg font-medium text-automotive-700">
                      {formatPrice(getCartTotal() * 1.21)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-automotive-600 hover:bg-automotive-700"
                >
                  Realizar pedido
                </Button>
              </div>
              
              <div className="mt-6">
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full"
                >
                  <Link to="/cars">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Seguir comprando
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
