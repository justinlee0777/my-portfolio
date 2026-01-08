import bcrypt from 'bcrypt';
import { model, Model, models, Schema } from 'mongoose';

export interface AuthorMapUser {
  username: string;
  password: string;
}

export const AuthorMapUserSchema = new Schema<AuthorMapUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AuthorMapUserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export interface IAuthorMapUserMethods {
  validatePassword(candidatePassword: string): boolean;
}

const AuthorMapUserModelName = 'AuthorMapUser';

export type AuthorMapUserDocument = Document &
  AuthorMapUser &
  IAuthorMapUserMethods;

export const AuthorMapUserModel: Model<AuthorMapUserDocument> =
  models[AuthorMapUserModelName] ||
  model(AuthorMapUserModelName, AuthorMapUserSchema);
