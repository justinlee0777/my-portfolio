import 'dotenv/config';

import getOpenAIApi from '../api/openai/open-ai.client';
import { EldenRingEmbeddingsModel } from '../models/elden-ring-embeddings.model';
import connectToMongoDB from '../page-utils/prospero/connect-to-mongodb.function';

async function uploadEldenRingEmbeddings() {
  const chunks = [
    'Sorcery associated with the Carian queen.',
    `Uses the caster as a vessel to incarnate a full moon, then sends it floating toward foes. The full moon dispels all sorcery that touches it, and temporarily reduces magic damage negation for those it strikes.`,
    `Queen Rennala encountered this enchanting moon when she was young, and later, it would bewitch the academy.`,
  ];

  const { embeddings } = getOpenAIApi();

  const generatedEmbeddings = await embeddings.create({
    model: 'text-embedding-3-small',
    input: chunks,
  });

  await connectToMongoDB();

  const itemName = `Rennala's Full Moon`;

  await EldenRingEmbeddingsModel.bulkWrite(
    generatedEmbeddings.data.map((generatedEmbedding, i) => ({
      updateOne: {
        filter: { itemName, text: chunks[i] },
        update: {
          $set: {
            itemName,
            text: chunks[i],
            embedding: generatedEmbedding.embedding,
          },
        },
        upsert: true,
      },
    }))
  );
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
