import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'senha';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload: string | object) => {
  const token = jwt.sign({ payload }, secret, jwtConfig);
  return token;
};

export default generateToken;
