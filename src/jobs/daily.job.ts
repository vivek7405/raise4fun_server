import * as cron from 'node-cron';
import CampaignService from '../services/campaigns.service';
import moment from 'moment';

cron.schedule('53 12 * * *', () => {
  console.log('Daily job startted at ' + moment().toLocaleString());

  const campaignService = new CampaignService();
  campaignService.updateAllCampaignsLanguages();
});
