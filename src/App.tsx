
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contextos
import { CartProvider } from './contexts/CartContext';

// Importar páginas
import Index from './pages/Index';
import CarsPage from './pages/CarsPage';
import CarDetailPage from './pages/CarDetailPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AboutUsPage from './pages/AboutUsPage';
import ServicesPage from './pages/ServicesPage';
import NotFound from './pages/NotFound';

// Importar páginas de administración
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminVehiclesPage from './pages/AdminVehiclesPage';
import AdminVehicleEditPage from './pages/AdminVehicleEditPage';

// Toaster para notificaciones
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          
          {/* Rutas de administración */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/vehicles" element={<AdminVehiclesPage />} />
          <Route path="/admin/vehicles/new" element={<AdminVehicleEditPage />} />
          <Route path="/admin/vehicles/edit/:id" element={<AdminVehicleEditPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
