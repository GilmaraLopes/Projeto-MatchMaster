import { Request, Response, NextFunction } from 'express';
import IUserValidations from './intefaces/validationUser';

export default class validationUser implements IUserValidations {
  private emailValidation = /\S+@\S+\.\S+/;
  validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!this.emailValidation.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  };

  validatePassword = (req: Request, res: Response, next:NextFunction) => {
    const { password } = req.body;
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  };
}
