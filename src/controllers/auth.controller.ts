import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import AuthService from '../services/auth.service';
import { User } from '../interfaces/users.interface';
import { RequestWithUser } from '../interfaces/auth.interface';

const FormData = require('form-data');
const fetch = require('node-fetch');

class AuthController {
  public authService = new AuthService();

  // public signUp = async (req: Request, res: Response, next: NextFunction) => {
  //   const userData: CreateUserDto = req.body;

  //   try {
  //     const signUpUserData: User = await this.authService.signup(userData);
  //     res.status(201).json({ data: signUpUserData, message: 'signup' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;

    const data = new FormData();
    data.append('client_id', process.env.GITHUB_CLIENT_ID);
    data.append('client_secret', process.env.GITHUB_CLIENT_SECRET);
    data.append('code', code);
    data.append('redirect_uri', process.env.GITHUB_REDIRECT_URL);

    const userData = new CreateUserDto();
    // Request to exchange code for an access token
    fetch(`https://github.com/login/oauth/access_token`, {
      method: 'POST',
      body: data,
    })
      .then(response => response.text())
      .then(paramsString => {
        let params = new URLSearchParams(paramsString);
        const access_token = params.get('access_token');
        userData.token = access_token;

        // Request to return data of a user that has been authenticated
        return fetch(`https://api.github.com/user`, {
          headers: {
            Authorization: `token ${access_token}`,
          },
        });
      })
      .then(response => response.json())
      .then(async response => {
        userData.userInfo = response;
        userData.name = response.name;
        userData.email = response.email;

        const { cookie, findUser } = await this.authService.login(userData);
        res.setHeader('Set-Cookie', [cookie]);
        res.status(200).json({ data: findUser, message: 'login' });
      })
      .catch(error => {
        return res.status(400).json(error);
      });
  };

  // public logIn = async (req: Request, res: Response, next: NextFunction) => {
  //   const userData: CreateUserDto = req.body;

  //   try {
  //     const { cookie, findUser } = await this.authService.login(userData);
  //     res.setHeader('Set-Cookie', [cookie]);
  //     res.status(200).json({ data: findUser, message: 'login' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userData: User = req.user;

    try {
      const logOutUserData: User = await this.authService.logout(userData);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
