import { AuthorMapUserModel } from '../models/author-map-user.model';
import connectToMongoDB from '../page-utils/prospero/connect-to-mongodb.function';

export async function validateAuthorMapUser(
  authToken: string
): Promise<boolean> {
  const decoded = Buffer.from(authToken, 'base64').toString('utf8');

  const [username, password] = decoded.split(':');

  await connectToMongoDB();

  const document = await AuthorMapUserModel.findOne({ username });

  return document?.validatePassword(password) ?? false;
}
