import 'dotenv/config';

import { EldenRingEmbeddingsModel } from '../../models/elden-ring-embeddings.model';
import connectToMongoDB from '../../page-utils/prospero/connect-to-mongodb.function';

async function addReferenceUrls() {
  await connectToMongoDB();

  const documents = await EldenRingEmbeddingsModel.find();

  for (const document of documents) {
    const urlPart = encodeURIComponent(document.itemName.split(' ').join('_'));

    document.referenceUrl = `https://eldenring.fandom.com/wiki/${urlPart}`;

    document.markModified('referenceUrl');
    await document.save();
  }
}

if (require.main === module) {
  addReferenceUrls()
    .then(() => {
      console.log('success');
      process.exit(0);
    })
    .catch((error) => {
      console.log('Error', error);
      process.exit(1);
    });
}
