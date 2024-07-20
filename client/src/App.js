import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/SignupLogin';
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound'; // Optional: A component to handle 404 errors

import './styles.css';
import SignupLogin from './pages/SignupLogin';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<SignupLogin />} /> {/* Default route */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="*" element={<NotFound />} /> {/* Handle 404 */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
