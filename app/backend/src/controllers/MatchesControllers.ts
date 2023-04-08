import { Request, Response } from 'express';
import IMatches from './interfaces/matchesController';
import IMatchesService from '../services/interfaces/matchesService';

export default class MatchesController implements IMatches {
  constructor(private matchesService: IMatchesService) {
  }

  async get(req: Request, res:Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const filter = await this.matchesService.getOne(inProgress as string);
      return res.status(200).json(filter);
    }
    const matches = await this.matchesService.getAllMatches();
    return res.status(200).json(matches);
  }

  async updateMatchFinish(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const finished = await this.matchesService.updateMatchFinish(id as unknown as number);

    return res.status(200).json({ finished });
  }

  async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const update = req.body;
    const updated = await this.matchesService.updateMatch(update, id as unknown as number);

    return res.status(200).json({ updated });
  }

  async insertMatch(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const data = await this.matchesService.insertMatch({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });
    return res.status(201).json(data);
  }
}
