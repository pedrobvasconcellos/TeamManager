import { useState } from "react";
import api from '../services/api';

export default function TeamForm({ onTeamCreated}) {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name.trim()) return;

        try{
            await api.post('/teams', { name });
            setName('');
            onTeamCreated();
        }catch (err) {
            console.error("Error ao cirar equipe:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome da equipe"
            />
            <button type="submit">Criar</button>
        </form>
    );
}