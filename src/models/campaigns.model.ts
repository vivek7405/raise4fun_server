import { model, Schema, Document } from 'mongoose';
// import { User } from '../interfaces/users.interface';

const campaignSchema: Schema = new Schema({
  repo: {
    id: String,
    html_url: String,
    name: String,
    full_name: String,
    language: String,
    languages_url: String,
    languages: Object,
    owner: String,
    private: Boolean,
    fork: Boolean,
  },
  description: String,
  isGoodies: Boolean,
  firstPrize: Number,
  secondPrize: Number,
  thirdPrize: Number,
  startDate: String,
  endDate: String,
});

const campaignModel = model<Document>('Campaign', campaignSchema);

export default campaignModel;
