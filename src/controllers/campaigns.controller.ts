import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { RequestWithUser } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import CampaignService from '../services/campaigns.service';

class CampaignsController {
  private campaignService = new CampaignService();

  public getAllCampaigns = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allCampaignsData = await this.campaignService.getAllCampaigns();
      res.status(200).json({ data: allCampaignsData, message: 'All Campaigns' });
    } catch (error) {
      next(error);
    }
  };

  public getCampaignById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaignId: string = req.params.id;
      const campaignData = await this.campaignService.getCampaignById(campaignId);
      res.status(200).json({ data: campaignData, message: `Campaign for id ${campaignId}` });
    } catch (error) {
      next(error);
    }
  };

  public createCampaign = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const campaignData = req.body;

    try {
      const createCampaignData = await this.campaignService.createCampaign(campaignData);
      res.status(201).json({ data: createCampaignData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default CampaignsController;
