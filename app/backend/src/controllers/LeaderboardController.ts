import { NextFunction, Request, Response } from 'express';
// import ILeaderboard from '../services/interfaces/leaderboardModel';
import IGetLeader from '../services/interfaces/leaderboardModel';

export default class LeaderboardController {
  constructor(private leaderboardService: IGetLeader) {

  }

  async getInfoHome(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const infoHome = await this.leaderboardService.getInfo();
      return res.status(200).json(infoHome);
    } catch (error) {
      next(error);
    }
  }
}
