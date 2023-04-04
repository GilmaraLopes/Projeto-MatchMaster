import { Request, Response } from 'express';
import IMatches from './interfaces/matchesController';
import IMatchesService from '../services/interfaces/matchesService';

export default class MatchesController implements IMatches {
  constructor(private matchesService: IMatchesService) {
  }

  async get(_req: Request, res:Response): Promise<Response> {
    const matches = await this.matchesService.getAllMatches();
    return res.status(200).json(matches);
  }
}
