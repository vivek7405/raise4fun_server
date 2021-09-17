import { Router } from 'express';
import GithubController from '../controllers/github.controller';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

class GithubRoute implements Route {
  public path = '/github';
  public router = Router();
  public githubController = new GithubController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/repos', authMiddleware, this.githubController.getAllRepos);
    this.router.get('/profile', authMiddleware, this.githubController.getProfile);
    this.router.get('/openfest-repo-issues/:owner/:repoName', this.githubController.getOpenfestRepoIssues);
    this.router.get('/pull-requests/:owner/:repoName', this.githubController.getPullRequestsForRepo);
    this.router.get('/beginner-repos', this.githubController.getBeginnerRepos);
  }
}

export default GithubRoute;
