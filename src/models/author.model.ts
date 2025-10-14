import {
  Author,
  AuthorLocation,
  MilestoneEvent,
  PortraitData,
  TimelineEvent,
  USState,
} from 'author-map-ui';
import { model, Model, models, Schema } from 'mongoose';

const AuthorLocationSchema = new Schema<AuthorLocation>({
  address: { type: String, required: true },
  state: { type: String, enum: Object.values(USState) },
});

const MilestoneEventSchema = new Schema<MilestoneEvent>({
  location: AuthorLocationSchema,
  notes: { type: String },
  date: { type: String, required: true },
});

const TimelineEventSchema = new Schema<TimelineEvent>({
  location: AuthorLocationSchema,
  notes: { type: String },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

const PortraitDataSchema = new Schema<PortraitData>({
  src: { type: String },
});

const AuthorSchema = new Schema<Author>({
  authorFirstName: { type: String, required: true },
  authorLastName: { type: String, required: true },
  authorFullName: { type: String },
  birthDate: { type: MilestoneEventSchema, required: true },
  deathDate: { type: MilestoneEventSchema },
  timeline: [{ type: TimelineEventSchema }],
  link: {
    type: String,
  },
  portrait: { type: PortraitDataSchema },
});

const AuthorModelName = 'Author';

export const AuthorModel: Model<Author> =
  models[AuthorModelName] || model(AuthorModelName, AuthorSchema);
