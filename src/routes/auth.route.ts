import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

// const bodyParser = require('body-parser');

class AuthRoute implements Route {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post('/signup', validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    // this.router.post('/login', validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post('/login', this.authController.logIn);
    this.router.post('/logout', this.authController.logOut);
  }
}

export default AuthRoute;
