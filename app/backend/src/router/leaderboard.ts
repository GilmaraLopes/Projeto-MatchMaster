import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoutes = Router();

const service = new LeaderboardService();

const controller = new LeaderboardController(service);

leaderboardRoutes.get('/home', controller.getInfoHome.bind(controller));
leaderboardRoutes.get('/away', controller.getInfoAway.bind(controller));

export default leaderboardRoutes;
