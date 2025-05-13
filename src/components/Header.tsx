
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { 
  ShoppingCart, 
  Menu, 
  X,
  Home,
  Car,
  ShoppingBag,
  Info,
  Wrench
} from 'lucide-react';
import { Button } from './ui/button';
import { useMobile } from '../hooks/use-mobile';

const Header: React.FC = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMobile();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/cars', label: 'Coches', icon: Car },
    { path: '/orders', label: 'Encargos', icon: ShoppingBag },
    { path: '/services', label: 'Servicios', icon: Wrench },
    { path: '/about', label: 'Sobre Nosotros', icon: Info }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-automotive-600">
              AutoVenta
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-1 py-2 text-sm font-medium transition-colors relative ${
                  isActive(item.path)
                    ? 'text-automotive-600'
                    : 'text-gray-600 hover:text-automotive-500'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-automotive-600" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-automotive-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden ml-2"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center py-3 text-sm font-medium ${
                    isActive(item.path)
                      ? 'text-automotive-600'
                      : 'text-gray-600'
                  }`}
                  onClick={closeMenu}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
