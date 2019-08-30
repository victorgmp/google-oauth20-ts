import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password?: string;
  googleId: string;
  thumbnail: string;
}

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  googleId: { type: String },
  thumbnail: { type: String },
});

export default model<IUser>('user', userSchema);
