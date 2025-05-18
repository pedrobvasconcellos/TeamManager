import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import teamRoutes from './routes/teamRoutes.js';
import alunoRoutes from './routes/alunoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/teams', teamRoutes);
app.use('/api/alunos', alunoRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch((err) => console.error('Erro na conexão com MongoDB', err));