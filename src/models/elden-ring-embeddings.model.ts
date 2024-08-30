import { model, Model, models, Schema } from 'mongoose';

export interface EldenRingEmbeddings {
  itemName: string;
  itemType:
    | 'remembrance'
    | 'weapon'
    | 'helm'
    | 'chest armor'
    | 'gauntlets'
    | 'leg armor'
    | 'sorcery'
    | 'incantation';
  text: string;
  embedding: Array<number>;
}

const EldenRingEmbeddingsSchema = new Schema<EldenRingEmbeddings>({
  itemName: { type: String, required: true },
  itemType: { type: String, required: true },
  text: { type: String, required: true },
  embedding: [{ type: Number }],
});

EldenRingEmbeddingsSchema.index({ itemName: 1, text: 1 }, { unique: true });

const EldenRingEmbeddingsModelName = 'EldenRingEmbeddings';

export const EldenRingEmbeddingsModel: Model<EldenRingEmbeddings> =
  models[EldenRingEmbeddingsModelName] ||
  model(EldenRingEmbeddingsModelName, EldenRingEmbeddingsSchema);

// Decide whether to copy Langchain's MongoDBAtlasVectorSearch or import the library https://github.com/langchain-ai/langchainjs/blob/3cc45fe7d82bbfeb8b0a86c7c5a7547291c94218/libs/langchain-mongodb/src/vectorstores.ts#L51
