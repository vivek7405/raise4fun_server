import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
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
