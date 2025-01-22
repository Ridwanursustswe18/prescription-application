import React, { useState } from 'react';
import { login, getToken } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const loginResult = await login(email, password, navigate);

      if (loginResult.error) {
        setError(loginResult.error);
      } else {
        setIsAuthenticated(true);
        navigate('/prescriptions');
        console.log('Login successful!');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error('Error during login:', err);
    }
  };

  

  // Inline styles for the form
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fc',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const inputGroupStyle = {
    marginBottom: '15px',
    textAlign: 'left',
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#777',
    marginBottom: '5px',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    transition: 'all 0.3s',
  };

  const inputFocusStyle = {
    outline: 'none',
    borderColor: '#007bff',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const errorMessageStyle = {
    color: '#e74c3c',
    fontSize: '14px',
    marginBottom: '15px',
  };

  const successMessageStyle = {
    color: '#2ecc71',
    fontSize: '16px',
  };

  const logoutButtonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  };

  const logoutButtonHoverStyle = {
    backgroundColor: '#c0392b',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={errorMessageStyle}>{error}</p>}
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Login
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
