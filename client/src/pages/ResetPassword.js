import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [token, setToken] = useState('');
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setToken(query.get('token') || ''); // Ensure token is correctly extracted
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token || !newPassword) {
            alert('Token and new password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result.message); // Display success message
            alert('Password reset successful');
        } catch (error) {
            console.error('Error:', error);
            alert('Password reset failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;
