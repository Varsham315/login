import React from 'react';
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

const Heading = styled.h1`
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
`;

const SubHeading = styled.h2`
    font-size: 24px;
    color: #666;
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 18px;
    color: #444;
    margin-bottom: 20px;
    text-align: center;
    max-width: 800px;
`;

const FeaturesList = styled.ul`
    font-size: 18px;
    color: #444;
    margin-bottom: 20px;
    list-style: disc;
    padding-left: 20px;
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

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic, such as clearing tokens
        // Then redirect to login or home page
        navigate('/login');
    };

    return (
        <Container>
            <Heading>Welcome</Heading>
            <SubHeading>This is created by Varshini Naravula</SubHeading>
            <Description>
                Welcome to our MERN stack application. Here is an overview of the key features and processes:
            </Description>
            <FeaturesList>
                <li>Signup: Register a new user with a username, email, and password.</li>
                <li>Login: Authenticate users with their email and password.</li>
                <li>Password Reset: Request a password reset link via email and reset the password.</li>
                <li>Email Authentication: Ensure secure email-based interactions.</li>
                <li>Logout: Sign out of your account and end your session.</li>
            </FeaturesList>
            <Description>
                Thank you for visiting our application. We hope you find it useful!
            </Description>
            <Button onClick={handleLogout}>Logout</Button>
        </Container>
    );
};

export default WelcomePage;
