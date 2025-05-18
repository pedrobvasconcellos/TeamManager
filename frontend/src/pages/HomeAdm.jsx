import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';

export default function HomeAdm() {
    const { user, logout } = useAuth();
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user){
            navigate('/');
        }
    }, [user, navigate]);

    const handleTeamCreated = () => setRefresh(!refresh);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <h1>Gerenciador de Equipes</h1>
            <button onClick={handleLogout}>Sair</button>
            <br />
            <hr />
            <TeamForm onTeamCreated={handleTeamCreated}/>
            <TeamList refresh={refresh}/>
        </div>
    )

}