import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaLock, FaEnvelope, FaMagic, FaBrain, FaRobot, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-box">
          <div className="brand-container">
            <h1>Welcome back</h1>
            <p className="subtitle">Sign in to continue to Gemini AI</p>
          </div>

          {error && (
            <div className="error-message">
              <FaLock /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className="auth-button">
              Sign in
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-buttons">
            <button className="social-button google" onClick={handleGoogleLogin}>
              <FcGoogle className="social-icon" />
              <span>Google</span>
            </button>
            <button className="social-button facebook" onClick={handleFacebookLogin}>
              <FaFacebook className="social-icon" />
              <span>Facebook</span>
            </button>
          </div>

          <p className="switch-auth">
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')} className="auth-link">
              Sign up
            </span>
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <div className="gemini-design">
          <h2>Experience the Power of AI</h2>
          <p>Unlock the future of conversation with Gemini AI's advanced language capabilities</p>
          
          <div className="gemini-features">
            <div className="feature-item">
              <FaMagic />
              <h3>Smart Responses</h3>
              <p>AI-powered conversations that understand context</p>
            </div>
            <div className="feature-item">
              <FaBrain />
              <h3>Deep Learning</h3>
              <p>Continuously evolving understanding</p>
            </div>
            <div className="feature-item">
              <FaRobot />
              <h3>AI Assistant</h3>
              <p>Your personal AI companion</p>
            </div>
            <div className="feature-item">
              <FaLightbulb />
              <h3>Creative Ideas</h3>
              <p>Innovative solutions and suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
