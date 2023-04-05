import { ModelStatic } from 'sequelize';
import verifyPassword from '../helpers/bcrypt';
import ErrorGenerate from '../helpers/errorGenerate';
import IUserService from './interfaces/userService';
import IUser from '../database/models/interfaces/usersModel';
import Users from '../database/models/UsersModel';
import generateToken from '../auth/token';

export default class UserService implements IUserService {
  constructor(private userModel: ModelStatic<Users>) {}

  async postUser(body: IUser): Promise<string> {
    const user = await this.userModel.findOne({ where: { email: body.email } });
    if (!user) {
      throw new ErrorGenerate('Invalid email or password', 401);
    }

    if (!user || !verifyPassword(body.password, user.password)) {
      throw new ErrorGenerate('Invalid email or password', 401);
    }
    const { email, role } = user;
    const token = generateToken({ email, role });
    return token;
  }
}
