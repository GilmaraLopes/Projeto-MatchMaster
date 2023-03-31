import { Request, Response } from 'express';

export default interface ITeam {
  get(req:Request, res:Response): Promise<Response>;
}
