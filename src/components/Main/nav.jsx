import React from 'react';
import './nav.css';
import assets from '../../assets';

const Nav = ({ toggleUserModal }) => {
    const userName = localStorage.getItem('userName');
    const isPremium = localStorage.getItem('isPremium') === 'true';

    return (
        <nav className="navbar">
            <div className="nav-left">
                <div className="logo-container">
                    <img src={assets.gemini_icon} alt="Gemini" className="nav-logo" />
                    <span className="logo-text">Gemini</span>
                    {isPremium && <span className="premium-tag">PRO</span>}
                </div>
            </div>
            
            <div className="nav-center">
                <div className="nav-links">
                    <a href="#" className="nav-link active">
                        <span className="link-icon">💬</span>
                        Chat
                    </a>
                    <a href="#" className="nav-link">
                        <span className="link-icon">✨</span>
                        Create
                    </a>
                    <a href="#" className="nav-link">
                        <span className="link-icon">📝</span>
                        Analyze
                    </a>
                </div>
            </div>

            <div className="nav-right">
                <button className="theme-toggle">
                    <span className="toggle-icon">🌙</span>
                </button>
                <div className="user-profile" onClick={toggleUserModal}>
                    <div className="user-avatar">
                        <img src={assets.user_icon} alt="User" />
                        {isPremium && <div className="premium-indicator"></div>}
                    </div>
                    <span className="user-name">{userName || 'User'}</span>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
