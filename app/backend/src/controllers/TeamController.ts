import { Request, Response } from 'express';
import ITeam from './interfaces/teamController';
import ITeamService from '../services/interfaces/teamService';

export default class TeamController implements ITeam {
  constructor(private teamService:ITeamService) {
  }

  async get(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.getAllTeams();
    return res.status(200).json(teams);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const teamsById = await this.teamService.getByIdTeams(id);
    return res.status(200).json(teamsById);
  }
}
