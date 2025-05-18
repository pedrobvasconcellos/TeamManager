import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import styles from './Login.module.css';

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const adminEmail = 'admin@gmail.com';
        const adminSenha = 'admin123';

        if (email === adminEmail && senha === adminSenha) {
            login({ nome: 'Admin', id: 'adm_id', token: 'adm_token' });
            navigate('/homeadm');
            return;
        }

        try{
            const res = await api.post('/alunos/login', { email, senha});

            const { token, nome, id } = res.data;
            login({ token, nome, id });
            navigate('/Home');
            
        }catch(err){
            console.error('Erro ao fazer login:', err);
            setError('Email ou senha inválidos');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br /><br />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                /><br /><br />
                <button className={styles.button} type="submit">Entrar</button>
            </form>

            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}