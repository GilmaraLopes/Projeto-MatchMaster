import { Request, Response } from 'express';

export default interface IUser {
  create(req: Request, res: Response): Promise<Response>;
}
