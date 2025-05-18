import express from 'express';
import { getTeams, createTeam, addMemberToTeam } from '../controllers/teamController.js';

const router = express.Router();

router.get('/', getTeams);
router.post('/', createTeam);
router.post('/:teamId/add-member', addMemberToTeam);

export default router;