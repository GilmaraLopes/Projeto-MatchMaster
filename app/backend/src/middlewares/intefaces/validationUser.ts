import { NextFunction, Request, Response } from 'express';

export default interface IUserValidations {
  validateEmail(req:Request, res: Response, next: NextFunction): void,
  validatePassword(req: Request, res: Response, next: NextFunction):void,
}
