import { Router } from 'express';
import TeamModel from '../database/models/TeamsModel';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const teamRoutes = Router();

const service = new TeamService(TeamModel);

const controller = new TeamController(service);

teamRoutes.get('/', controller.get.bind(controller));
teamRoutes.get('/:id', controller.getById.bind(controller));

export default teamRoutes;
