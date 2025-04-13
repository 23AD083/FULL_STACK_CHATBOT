import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './signup.css'; // Link to your CSS file

const SignupForm = ({ onClose, setShowLogin }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Send a POST request to the backend to register the user
            const response = await axios.post('http://localhost:5000/api/signup', { 
                fullName,
                email, 
                password 
            });

            // If successful, show success message and switch to login
            setSuccess('User registered successfully');
            setError('');
            setTimeout(() => {
                onClose(); // Close modal after 2 seconds
                setShowLogin(true); // Show the login form
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error registering user');
            setSuccess('');
        }
    };

    return (
        <div className="login-overlay">
            <div className="login-modal">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="login-btn" type="submit">Sign Up</button>
                </form>
                <p className="signup-text">
                    Already have an account? 
                    <a href="#!" onClick={() => { onClose(); setShowLogin(true); }}>Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
