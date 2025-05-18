import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from './Register.module.css';

export default function Register() {
    const [mensagem, setMensagem] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try{
            await api.post('/alunos/registrar', formData);
            setMensagem('Cadastro realizado com sucesso!');
            
            setTimeout(() => navigate('/'), 800);
        }catch(err) {
            console.error(err);
            setError('Erro ao registrar. Tente novamente.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Registro</h2>
            <form onSubmit={handleSubmit}>
            <input
            className={styles.input}
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                required
                /><br /><br />
            <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                /><br /><br />
            <input
                className={styles.input}
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
                /><br /><br />
                <button className={styles.button} type="submit">Registrar</button>
            </form>
            {mensagem && <p className={styles.sucesso}>{mensagem}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}