import { model, Schema, Document } from 'mongoose';
import { User } from '../interfaces/users.interface';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  userInfo: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
