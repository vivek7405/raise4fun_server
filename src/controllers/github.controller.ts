import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import GithubService from '../services/github.service';

class GithubController {
  public gihubService = new GithubService();

  public getAllRepos = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const repos = await this.gihubService.getAllRepos(req.user.token);
      res.status(200).json({ data: repos, message: 'Github Repos' });
    } catch (error) {
      next(error);
    }
  };

  public getBeginnerRepos = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const beginnerRepos = await this.gihubService.getBeginnerRepos();
      res.status(200).json({ data: beginnerRepos, message: 'Beginner Issues' });
    } catch (error) {
      next(error);
    }
  };

  public getProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const profile = await this.gihubService.getProfile(req.user.token);
      res.status(200).json({ data: profile, message: 'Github Profile' });
    } catch (error) {
      next(error);
    }
  };

  public getOpenfestRepoIssues = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const owner: string = req.params.owner;
      const repoName: string = req.params.repoName;

      const data = await this.gihubService.getOpenfestRepoIssues(owner, repoName);
      res.status(200).json({ data: data, message: 'Openfest Issues' });
    } catch (error) {
      next(error);
    }
  };

  public getPullRequestsForRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const owner: string = req.params.owner;
      const repoName: string = req.params.repoName;

      const data = await this.gihubService.getPullRequestsForRepo(owner, repoName);
      res.status(200).json({ data: data, message: 'Openfest Issues' });
    } catch (error) {
      next(error);
    }
  };
}

export default GithubController;
