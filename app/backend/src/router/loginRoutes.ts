import { Router } from 'express';
import UsersModel from '../database/models/UsersModel';
import UsersService from '../services/UsersService';
import UsersController from '../controllers/UserController';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import ValidationUser from '../middlewares/validationUser';

const validation = new ValidationUser();

const userRoutes = Router();

const service = new UsersService(UsersModel);

const controller = new UsersController(service);

userRoutes.post(
  '/',
  verifyRequiredFields,
  validation.validateEmail,
  validation.validatePassword,
  controller.create.bind(controller),
);

export default userRoutes;
