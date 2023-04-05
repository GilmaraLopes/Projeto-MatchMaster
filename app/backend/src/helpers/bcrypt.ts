import { compareSync } from 'bcryptjs';

const verifyPassword = (passwordBody: string, passwordUser: string): boolean =>
  compareSync(passwordBody, passwordUser);

export default verifyPassword;
