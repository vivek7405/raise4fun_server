import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

const bodyParser = require('body-parser');
const FormData = require('form-data');
const fetch = require('node-fetch');

class AuthRoute implements Route {
  public router = Router();
  public authController = new AuthController();

  private enableCors() {
    this.router.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
  }

  private setupBodyParser() {
    this.router.use(bodyParser.json());
    this.router.use(bodyParser.json({ type: 'text/*' }));
    this.router.use(bodyParser.urlencoded({ extended: false }));
  }

  constructor() {
    this.enableCors();
    this.setupBodyParser();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post('/login', validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post('/logout', authMiddleware, this.authController.logOut);
    this.router.post('/authenticate', (req, res) => {
      const { code } = req.body;

      const data = new FormData();
      data.append('client_id', process.env.GITHUB_CLIENT_ID);
      data.append('client_secret', process.env.GITHUB_CLIENT_SECRET);
      data.append('code', code);
      data.append('redirect_uri', process.env.GITHUB_REDIRECT_URL);

      // Request to exchange code for an access token
      fetch(`https://github.com/login/oauth/access_token`, {
        method: 'POST',
        body: data,
      })
        .then(response => response.text())
        .then(paramsString => {
          let params = new URLSearchParams(paramsString);
          const access_token = params.get('access_token');

          // Request to return data of a user that has been authenticated
          return fetch(`https://api.github.com/user`, {
            headers: {
              Authorization: `token ${access_token}`,
            },
          });
        })
        .then(response => response.json())
        .then(response => {
          return res.status(200).json(response);
        })
        .catch(error => {
          return res.status(400).json(error);
        });
    });
  }
}

export default AuthRoute;
