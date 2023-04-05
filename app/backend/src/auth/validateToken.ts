import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'senha';

const auth = async (req:Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = jwt.verify(token, secret);
    req.body.user = payload;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default auth;
