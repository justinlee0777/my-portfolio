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
    | 'incantation'
    | 'key item'
    | 'consumable'
    | 'crafting material';
  text: string;
  embedding: Array<number>;
  referenceUrl: string;
}

const EldenRingEmbeddingsSchema = new Schema<EldenRingEmbeddings>({
  itemName: { type: String, required: true },
  itemType: { type: String, required: true },
  text: { type: String, required: true },
  embedding: [{ type: Number }],
  referenceUrl: { type: String },
});

EldenRingEmbeddingsSchema.index({ itemName: 1, text: 1 }, { unique: true });

const EldenRingEmbeddingsModelName = 'EldenRingEmbeddings';

export const EldenRingEmbeddingsModel: Model<EldenRingEmbeddings> =
  models[EldenRingEmbeddingsModelName] ||
  model(EldenRingEmbeddingsModelName, EldenRingEmbeddingsSchema);
