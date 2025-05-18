import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user){
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <p>Bem vindo(a), {user?.nome}!</p>
            <button onClick={handleLogout}>Sair</button>
        </div>
    )

}