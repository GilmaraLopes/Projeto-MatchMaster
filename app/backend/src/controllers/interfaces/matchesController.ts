import { Request, Response } from 'express';

export default interface IMatches {
  get(req: Request, res: Response): Promise<Response>;
  updateMatchFinish(req:Request, res: Response): Promise<Response>;
}
