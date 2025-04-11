import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.scss';

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (isRegister) {
      if (formData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      validateForm();

      if (isRegister) {
        await register({
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password
        });
      } else {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error en el login');
        }

        const { token, user } = await response.json();
        login(token);
      }

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    }

    console.log('Form submitted:', formData);
  };

  return (
    <div className="login-container">
      <div className="video-overlay">
        <video autoPlay muted loop className="background-video">
          <source src="/videos/ocean.mp4" type="video/mp4" />
        </video>

        {!showForm ? (
          <div className="initial-content">
            <h1 className="join-text" onClick={() => setShowForm(true)}>Join the fight</h1>
            <button className="scroll-down" onClick={() => setShowForm(true)}>
              ↓
            </button>
          </div>
        ) : (
          <div className="form-container">
            {error && <div className="error-message">{error}</div>}

            {!isRegister ? (
              <div className="login-form">
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="button-group">
                    <button type="submit" className="login-btn">Login</button>
                    <button
                      type="button"
                      className="register-btn"
                      onClick={() => setIsRegister(true)}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="register-form">
                <button
                  className="back-button"
                  onClick={() => setIsRegister(false)}
                >
                  Back to Login
                </button>
                <h2>Join the strength</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">Submit</button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login; 