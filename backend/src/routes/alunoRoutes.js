import express from 'express';
import { registrarAluno, loginAluno } from '../controllers/alunoController.js';

const router = express.Router();

router.post('/registrar', registrarAluno);
router.post('/login', loginAluno);

export default router;