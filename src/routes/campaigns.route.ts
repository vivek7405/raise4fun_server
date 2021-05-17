import { Router } from 'express';
import CampaignsController from '../controllers/campaigns.controller';
import UsersController from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class CampaignsRoute implements Route {
  public path = '/campaigns';
  public router = Router();
  public campaignsController = new CampaignsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, this.campaignsController.getAllCampaigns);
    this.router.get(`/:id`, this.campaignsController.getCampaignById);
    this.router.post(`/`, authMiddleware, this.campaignsController.createCampaign);
  }
}

export default CampaignsRoute;
