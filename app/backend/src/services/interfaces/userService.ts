import IUser from '../../database/models/UsersModel';

export default interface IUserService {
  postUser(body:IUser): Promise<string | void>;

}
