import Aluno from '../models/Aluno.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarAluno = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const existe = await Aluno.findOne({ email });
        if (existe) return res.status(400).json({ mensagem: 'Email já cadastrado'});

        const senhaHash = await bcrypt.hash(senha, 10);
        const novoAluno = new Aluno({ nome, email, senha: senhaHash});
        await novoAluno.save();

        res.status(201).json({ mensagem: 'Aluno registrado com sucesso' });
    } catch (error){
        res.status(500).json({ mensagem: 'Erro ao registrar aluno', error: error.message});
    }
};

export const loginAluno = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const aluno = await Aluno.findOne({ email });
        if (!aluno) return res.status(400).json({ mensagem: 'Email não encontrado'});

        const senhaValida = await bcrypt.compare(senha, aluno.senha);
        if (!senhaValida) return res.status(400).json({ mensagem: 'senha incorreta'});

        const token = jwt.sign({ id: aluno._id, tipo: 'aluno'}, process.env.JWT_SECRET, { expiresIn: '2h'});

        res.status(200).json({ token, nome: aluno.nome, id: aluno._id });
    } catch (error){
        res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error.message});
    }
};