import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';
import LoadingSpinner from '../components/LoadingSpinner';
import { jwtDecode } from 'jwt-decode';
import { UserPayload } from '@/shared/types/jwt';
//import { User } from '@/shared/types/db-models';

interface User {
  id: number;
  email: string;
  name: string;
  lastname: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedData: { name: string; lastname: string; email: string }) => Promise<void>;
  changePassword: (passwordData: { currentPassword: string; newPassword: string }) => Promise<void>;
  register: (userData: {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthToken = async (token: string): Promise<User | null> => {
    try {
      const decoded = jwtDecode<UserPayload>(token);

      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        throw new Error('Token expired');
      }

      const response = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Token verification failed');

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Authentication error:', error);
      localStorage.removeItem('token');
      return null;
    }
  };

  const initializeAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<UserPayload>(token);
      const verifiedUser = await checkAuthToken(token);
      setUser(verifiedUser || decoded);
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
    }
    setLoading(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const login = async (token: string) => {
    try {
      const decoded = jwtDecode<User>(token);
      const verifiedUser = await checkAuthToken(token);
      
      setUser(verifiedUser || decoded);
      localStorage.setItem('token', token);
    } catch (error) {
      throw new Error('Invalid login credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const register = async (userData: {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    // Auto-login after registration
    const loginResponse = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
      })
    });

    if (!loginResponse.ok) throw new Error('Auto-login failed');
    
    const { token } = await loginResponse.json();
    await login(token);
  };

  const updateUser = async (updatedData: { name: string; lastname: string; email: string }) => {
    try {
      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }
  
      // Si la actualización es exitosa, actualiza los datos en el contexto
      setUser((prevUser) => ({
        ...prevUser!,
        ...updatedData,
      }));
  
      alert('Datos actualizados con éxito!');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      throw new Error('Error al actualizar los datos del usuario');
    }
  };

  const changePassword = async (passwordData: { currentPassword: string; newPassword: string }) => {
    try {
      const response = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(passwordData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }
  
      alert('Contraseña cambiada con éxito!');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw new Error('Error al cambiar la contraseña');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        changePassword,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};