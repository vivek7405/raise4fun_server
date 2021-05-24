import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import AuthController from '../controllers/auth.controller';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();
  public authController = new AuthController();

  private enableCors() {
    this.router.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
      next();
    });
  }

  constructor() {
    this.enableCors();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, this.indexController.index);
    this.router.post('/login', this.authController.logIn);
    this.router.post('/logout', authMiddleware, this.authController.logOut);
  }
}

export default IndexRoute;
