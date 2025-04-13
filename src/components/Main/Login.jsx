import React, { useState } from "react";
import axios from "axios";
import './login.css';

const Login = ({ onClose, setIsAuthenticated, setShowSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", { email, password });
            localStorage.setItem("token", response.data.token); // Store JWT token
            setIsAuthenticated(true); // Update auth state
            alert("Login successful!");
            onClose(); // Close modal after login
        } catch (error) {
            setMessage(error.response.data.message); // Show error message
        }
    };

    return (
        <div className="login-overlay">
            <div className="login-modal">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Login</h2>
                {message && <p className="error">{message}</p>}
                <form onSubmit={handleLogin}>
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
                    <button className="login-btn" type="submit">Login</button>
                </form>
                <p className="signup-text">
                    Don't have an account? 
                    <a href="#!" onClick={() => { onClose(); setShowSignup(true); }}>Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
