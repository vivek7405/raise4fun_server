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

  // private enableCors() {
  //   this.router.use((req, res, next) => {
  //     res.header('Access-Control-Allow-Origin', '*');
  //     next();
  //   });
  // }

  // private setupBodyParser() {
  //   this.router.use(bodyParser.json());
  //   this.router.use(bodyParser.json({ type: 'text/*' }));
  //   this.router.use(bodyParser.urlencoded({ extended: false }));
  // }

  constructor() {
    // this.enableCors();
    // this.setupBodyParser();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post('/signup', validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    // this.router.post('/login', validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post('/login', this.authController.logIn);
    this.router.post('/logout', authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
