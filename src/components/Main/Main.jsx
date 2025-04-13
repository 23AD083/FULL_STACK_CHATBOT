import React, { useContext, useState } from "react";
import { assets } from '../../assets/assets';
import './Main.css';
import { Context } from "../../Context/Context";
import Login from "./Login";
import SignupForm from "./Signup"; 
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const [showLogin, setShowLogin] = useState(false); 
    const [showSignup, setShowSignup] = useState(false); 
    const [showUserModal, setShowUserModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        navigate('/login');
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowSignup(false); 
    };

    const handleSignupClick = () => {
        setShowSignup(true);
        setShowLogin(false); 
    };

    const toggleUserModal = () => {
        setShowUserModal(!showUserModal);
    };

    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('email');
    const isPremium = localStorage.getItem('isPremium') === 'true';

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <div className="user-actions">
                    <img
                        src={assets.user_icon}
                        alt="User"
                        onClick={toggleUserModal}
                        style={{ marginRight: '15px', cursor: 'pointer' }}
                    />
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4400/4400629.png"
                        alt="Logout"
                        className="logout-icon"
                        onClick={handleLogout}
                    />
                </div>
            </div>

            {/* User Info Modal */}
            {showUserModal && (
                <div className="modal-overlay" onClick={toggleUserModal}>
                    <div className="user-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Premium Dashboard</h2>
                            <button className="close-button" onClick={toggleUserModal}>×</button>
                        </div>
                        <div className="modal-content">
                            <div className="user-avatar">
                                <img src={assets.user_icon} alt="User Avatar" />
                            </div>
                            <div className="user-info">
                                <div className="info-item">
                                    <span className="info-icon">👤</span>
                                    <div>
                                        <label>Full Name</label>
                                        <p>{userName || 'Not available'}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <span className="info-icon">✉️</span>
                                    <div>
                                        <label>Email Address</label>
                                        <p>{userEmail || 'Not available'}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <span className="info-icon">⭐</span>
                                    <div>
                                        <label>Membership</label>
                                        <p>Free User</p>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button className="upgrade-btn">⭐ Upgrade to Premium</button>
                                <button className="edit-profile-btn">✏️ Edit Profile</button>
                                <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, Dev.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cardsproperty">
                            <div className="card">
                                <p>Suggest beautiful places to visit for an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize the concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here...' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may contain bottom info, including about people. So double-check its responses. Your privacy and Gemini apps.
                    </p>
                </div>
            </div>

            {/* Login Modal - Display Over Main Page */}
            {showLogin && <Login onClose={() => setShowLogin(false)} setShowSignup={setShowSignup} />}

            {/* Signup Modal - Display Over Main Page */}
            {showSignup && <SignupForm onClose={() => setShowSignup(false)} setShowLogin={setShowLogin} />}
        </div>
    );
};

export default Main;
