
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AdminAuthProps {
  children: React.ReactNode;
}

// Default admin credentials - in a real app, these would be stored securely in a database
export const DEFAULT_ADMIN = {
  username: "admin",
  password: "admin123"
};

const AdminAuth: React.FC<AdminAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Ensure default admin is stored in sessionStorage
    const storedAdmin = sessionStorage.getItem('defaultAdmin');
    if (!storedAdmin) {
      sessionStorage.setItem('defaultAdmin', JSON.stringify(DEFAULT_ADMIN));
    }
    
    const isAdminLoggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
    
    if (!isAdminLoggedIn) {
      toast.error('Debe iniciar sesión para acceder al panel de administración');
      navigate('/admin/login');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AdminAuth;
