import { Router } from 'express';
import MatchesModel from '../database/models/MatchesModel';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesControllers';
import auth from '../auth/validateToken';

const matchesRoutes = Router();

const service = new MatchesService(MatchesModel);

const controller = new MatchesController(service);

matchesRoutes.get('/', controller.get.bind(controller));
matchesRoutes.patch('/:id/finish', auth, controller.updateMatchFinish.bind(controller));

export default matchesRoutes;
