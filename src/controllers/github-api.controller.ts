import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { RequestWithUser } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import GithubAPIService from '../services/github-api.service';

class GithubAPIController {
  public gihubService = new GithubAPIService();

  public getAllRepos = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const repos = this.gihubService.getAllRepos(req.user.token);
      res.status(200).json({ data: repos, message: 'allRepos' });
    } catch (error) {
      next(error);
    }
  };
}

export default GithubAPIController;
