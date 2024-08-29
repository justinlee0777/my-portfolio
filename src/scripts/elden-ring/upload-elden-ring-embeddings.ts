import 'dotenv/config';

import getOpenAIApi from '../../api/openai/open-ai.client';
import { EldenRingEmbeddingsModel } from '../../models/elden-ring-embeddings.model';
import connectToMongoDB from '../../page-utils/prospero/connect-to-mongodb.function';
import scrapeEldenRingWeapons from './scrape-elden-ring-weapons';

async function uploadEldenRingEmbeddings() {
  const content = await scrapeEldenRingWeapons();

  for (const { itemName, chunks, itemType } of content) {
    console.log(`working on ${itemName}...`);
    const { embeddings } = getOpenAIApi();

    const generatedEmbeddings = await embeddings.create({
      model: 'text-embedding-3-small',
      input: chunks,
    });

    await connectToMongoDB();

    await EldenRingEmbeddingsModel.bulkWrite(
      generatedEmbeddings.data.map((generatedEmbedding, i) => ({
        updateOne: {
          filter: { itemName, text: chunks[i] },
          update: {
            $set: {
              itemName,
              text: chunks[i],
              embedding: generatedEmbedding.embedding,
              itemType,
            },
          },
          upsert: true,
        },
      }))
    );
  }
}

if (require.main === module) {
  uploadEldenRingEmbeddings()
    .then(() => {
      console.log('success');
      process.exit(0);
    })
    .catch((error) => {
      console.log('Error', error);
      process.exit(1);
    });
}
