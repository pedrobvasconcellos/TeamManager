import Team from '../models/Team.js';
import Aluno from '../models/Aluno.js';
import mongoose from 'mongoose';

export const getTeams = async (req, res) => {
    try{
        const teams = await Team.find();
        res.json(teams);
    }catch(err){
        res.status(500).json({ error: 'Erro ao buscar equipes'});
    }
};

export const createTeam = async (req, res) => {
    try{
        const { name, members } = req.body;
        const newTeam = new Team({ name, members });
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch(err){
        res.status(400).json({ error: 'Erro ao criar equipe'});
    }
};

export const addMemberToTeam = async (req, res) => {
    try{
        const { teamId } = req.params;
        const { memberId } = req.body;

        if(!mongoose.Types.ObjectId.isValid(teamId)){
            return res.status(400).json({ error: 'ID da equipe inválido' });
        }

        if(!mongoose.Types.ObjectId.isValid(memberId)){
            return res.status(400).json({ error: 'ID de aluno inválido' });
        }

        const aluno = await Aluno.findById(memberId);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Equipe não encontrada' });
        }

        if (team.members.includes(memberId)) {
            return res.status(400).json({ error: 'Este aluno já faz parte da equipe' });
        }

        team.members.push(memberId);
        await team.save();

        res.json(team);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar membro à equipe' });
    }
};