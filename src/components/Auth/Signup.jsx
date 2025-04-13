import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaUser, FaEnvelope, FaLock, FaMagic, FaBrain, FaRobot, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      setError('Please agree to the Terms & Privacy Policy');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  const handleFacebookSignup = () => {
    console.log('Facebook signup clicked');
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-box">
          <div className="brand-container">
            <h1>Gemini AI</h1>
            <p className="subtitle">Create your account</p>
          </div>

          {error && (
            <div className="error-message">
              <FaLock /> {error}
            </div>
          )}

          <div className="social-buttons">
            <button className="social-button google" onClick={handleGoogleSignup}>
              <FcGoogle className="social-icon" />
              <span>Sign up with Google</span>
            </button>
            <button className="social-button facebook" onClick={handleFacebookSignup}>
              <FaFacebook className="social-icon" />
              <span>Sign up with Facebook</span>
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <span>I agree to the Terms & Privacy Policy</span>
              </label>
            </div>
            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>

          <p className="switch-auth">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className="auth-link">
              Login
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
          <h2>Welcome to Gemini AI</h2>
          <p>Join the next generation of AI-powered conversations and unlock limitless possibilities</p>
          
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

export default Signup;
