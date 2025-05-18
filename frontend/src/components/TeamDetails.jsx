import { useState } from "react";
import api from "../services/api";

export default function TeamDetails({ team, onUpdate }){
    const [memberId, setMemberId] = useState("");

    const handleAddMember = async () => {
        if (!memberId.trim()) return;

        try {
            const res = await api.post(`/teams/${team._id}/add-member`, {
                memberId,
            });
            onUpdate();
            setMemberId("");
        }catch (err) {
            console.error("Erro ao adicionar membro:", err.response?.data?.error || err.message);
        }
    };

    return (
        <div>
            <h3>{team.name}</h3>
            <p><strong>Membros:</strong></p>
            <ul>
                {team.members.map((member, i) => (
                    <li key={i}>{member}</li>
                ))}
            </ul>
            <input
                placeholder="ID do Aluno"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
            />
            <button onClick={handleAddMember}>Adicionar Membro</button>
        </div>
    );
}