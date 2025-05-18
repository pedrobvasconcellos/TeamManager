import { useEffect, useState } from "react";
import api from "../services/api";
import TeamDetails from "./TeamDetails";

export default function TeamList({ refresh }) {
    const [teams, setTeams] = useState([]);

    const loadTeams = async () => {
        try {
            const res = await api.get("/teams");
            setTeams(res.data);
        } catch (err) {
            console.error('Erro ao buscar equipes', err);
        }
    };

    useEffect(() => {
        loadTeams();
    }, [refresh]);

    return (
        <div>
            {teams.map((team) => (
                <div key={team._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                    <TeamDetails team={team} onUpdated={loadTeams} />
                </div>
            ))}
        </div>
    );
}