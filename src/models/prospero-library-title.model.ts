import { model, Model, models, Schema } from 'mongoose';

export type TitleTag = 'essay' | 'novel' | 'play' | 'novella';

export type TitleField =
  | 'fiction'
  | 'computer science'
  | 'philosophy'
  | 'satire';

export type TitleSource = 'Project Gutenberg' | 'Other';

export interface ProsperoLibraryTitle {
  name: string;
  authorFirstName: string;
  authorLastName: string;
  fields: Array<TitleField>;
  tags: Array<TitleTag>;
  urlSlug: string;
  source: TitleSource;
  sourceUrl: string;
}

const ProsperoLibraryTitleSchema = new Schema<ProsperoLibraryTitle>({
  name: { type: String, required: true },
  authorFirstName: { type: String, required: true },
  authorLastName: { type: String, required: true },
  fields: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  urlSlug: { type: String },
  source: { type: String, required: true },
  sourceUrl: { type: String, required: true },
});

const ProsperoLibraryTitleModelName = 'ProsperoLibraryTitle';

export const ProsperoLibraryTitleModel: Model<ProsperoLibraryTitle> =
  models[ProsperoLibraryTitleModelName] ||
  model(ProsperoLibraryTitleModelName, ProsperoLibraryTitleSchema);
