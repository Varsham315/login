import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
    padding: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const ToggleButton = styled.button`
    background: none;
    border: none;
    color: #007bff;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
    transition: color 0.3s;

    &:hover {
        color: #0056b3;
    }
`;

const ForgotPasswordLink = styled.a`
    color: #007bff;
    font-size: 16px;
    text-decoration: none;
    margin-top: 10px;
    display: block;
    text-align: center;

    &:hover {
        text-decoration: underline;
    }
`;

const SignupLogin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup-or-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'An error occurred');
                return;
            }

            const result = await response.json();
            setMessage(result.message);
            setError(''); // Clear any previous error
            navigate('/welcome');
        } catch (error) {
            setError('An error occurred while processing your request.');
        }
    };

    return (
        <Container>
            <h1>MERN LOGIN SYSTEM</h1>
            <Form onSubmit={handleSubmit}>
                {isSignup && (
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                )}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">{isSignup ? 'Signup' : 'Login'}</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
            </Form>
            <ToggleButton onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Already have an account? Login' : 'New here? Signup'}
            </ToggleButton>
            <ForgotPasswordLink href="/forgot-password">Forgot Password?</ForgotPasswordLink>
        </Container>
    );
};

export default SignupLogin;
