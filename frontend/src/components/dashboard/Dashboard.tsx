import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';  // Asumiendo que tienes un contexto de autenticación
import { CompanyList } from '../companies';  // Componente para listar empresas
import './Dashboard.scss';  // Estilos del Dashboard
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, updateUser, changePassword, logout } = useAuth();  // Accede al usuario y funciones de actualización
  const [formData, setFormData] = useState({
    name: user?.name || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    setError(null);
    try {
      if (formData.name && formData.lastname && formData.email) {
        await updateUser(formData);  // Función para actualizar los datos del usuario
        alert('Datos actualizados con éxito!');
      } else {
        setError('Por favor, completa todos los campos.');
      }
    } catch (err) {
      setError('Error al actualizar los datos.');
    }
  };

  const handleChangePassword = async () => {
    setError(null);
    try {
      if (passwordData.newPassword === passwordData.confirmNewPassword) {
        await changePassword(passwordData);  // Función para cambiar la contraseña
        alert('Contraseña cambiada con éxito!');
      } else {
        setError('Las contraseñas no coinciden.');
      }
    } catch (err) {
      setError('Error al cambiar la contraseña.');
    }
  };

  const handleLogout = () => {
    logout();  // Ejecuta el logout
    alert('Has cerrado sesión con éxito.');  // Mensaje opcional
    // Redirigir al usuario a la página de login o landing (depende de la configuración de rutas)
    navigate('/login'); // O usa un router si estás usando react-router
  };

  return (
    <div className="dashboard-container">
      <h1>Bienvenido a tu Dashboard</h1>

        <div className="userInfo">
        <h2>Mis Datos Personales</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              placeholder="Apellido"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="button" onClick={handleUpdateUser} className="update-btn">
            Actualizar Datos
          </button>
        </form>
      </div>

      <div className="change-password">
        <h2>Cambiar Contraseña</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Contraseña Actual"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Nueva Contraseña"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
              placeholder="Confirmar Nueva Contraseña"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="button" onClick={handleChangePassword} className="change-password-btn">
            Cambiar Contraseña
          </button>
        </form>
      </div>

      <div className="companies-section">
        <CompanyList /> {/* Componente que muestra las empresas */}
      </div>
    </div>
  );
};

export default Dashboard;
