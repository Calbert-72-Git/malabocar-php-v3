
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAdminLoggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
    
    if (!isAdminLoggedIn) {
      toast.error('Debe iniciar sesión para acceder al panel de administración');
      navigate('/admin/login');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AdminAuth;
