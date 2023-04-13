import { NextFunction, Request, Response } from 'express';
import IGetLeader from '../services/interfaces/leaderboardModel';

export default class LeaderboardController {
  constructor(private leaderboardService: IGetLeader) {

  }

  async getInfoHome(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const infoHome = await this.leaderboardService.getInfo('homeTeamId');
      return res.status(200).json(infoHome);
    } catch (error) {
      next(error);
    }
  }

  async getInfoAway(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const getInfoAway = await this.leaderboardService.getInfo('awayTeamId');
      return res.status(200).json(getInfoAway);
    } catch (error) {
      next(error);
    }
  }

  async getInfoBoard(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const getInfoAll = await this.leaderboardService.getInfoGeneral();
      return res.status(200).json(getInfoAll);
    } catch (error) {
      next(error);
    }
  }
}
