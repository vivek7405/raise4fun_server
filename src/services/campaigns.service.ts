// import bcrypt from 'bcrypt';
import axios from 'axios';
import { request } from 'node:http';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import campaignModel from '../models/campaigns.model';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';

class CampaignService {
  public campaigns = campaignModel;

  public async getAllCampaigns() {
    let campaigns = await this.campaigns.find();
    return campaigns;
  }

  // JOB
  public async updateAllCampaignsLanguages() {
    let campaigns = await this.campaigns.find();
    await Promise.all(
      campaigns.map(async (campaign: any) => {
        const res = await axios.get(campaign.repo.languages_url);
        campaign.repo.languages = res.data;
        try {
          await this.campaigns.findByIdAndUpdate(campaign.id, campaign);
        } catch (error) {
          console.log('Error updating campaign with id ' + campaign.id + ': ' + error);
        }
      }),
    );
    return campaigns;
  }

  public async getCampaignById(campaignId) {
    const campaign: any = await this.campaigns.findOne({ _id: campaignId });
    if (!campaign) throw new HttpException(409, `Campaign with id ${campaignId} not found`);
    return campaign;
  }

  public async createCampaign(campaignData) {
    if (isEmpty(campaignData)) throw new HttpException(400, 'Invalid Campaign Data');

    const findCampaign = await this.campaigns.findOne({ 'repo.id': campaignData.repo.id });
    if (findCampaign) throw new HttpException(409, `Campaign with repo id ${campaignData.repo.id} already exists`);

    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    const res = await axios.get(campaignData.repo.languages_url);
    campaignData.repo.languages = res.data;
    const createCampaignData = await this.campaigns.create({ ...campaignData });
    return createCampaignData;
  }
}

export default CampaignService;
