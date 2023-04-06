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
}
