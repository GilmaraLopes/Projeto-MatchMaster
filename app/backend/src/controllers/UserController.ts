import { NextFunction, Request, Response } from 'express';
import IUserService from '../services/UsersService';

export default class UserController {
  constructor(private userService: IUserService) {
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const token = await this.userService.postUser(body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
