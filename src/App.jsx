import { useState, useEffect } from 'react'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import './App.css'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<div className="auth-page"><Login /></div>} />
        <Route path="/signup" element={<div className="auth-page"><Signup /></div>} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div className="dashboard">
                <Sidebar />
                <div className="main-content">
                  <Main />
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
