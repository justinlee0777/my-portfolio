import {
  TimeSpan,
  type Author,
  type AuthorGroup,
  type AuthorLocation,
  type MilestoneEvent,
  type PortraitData,
  type TimelineEvent,
} from 'author-map-ui';
import { model, Model, models, Schema } from 'mongoose';

const AuthorLocationSchema = new Schema<AuthorLocation>(
  {
    address: { type: String, required: true },
    state: { type: String },
  },
  { _id: false }
);

const MilestoneEventSchema = new Schema<MilestoneEvent>(
  {
    location: AuthorLocationSchema,
    notes: { type: String },
    date: { type: String, required: true },
  },
  { _id: false }
);

const TimelineEventSchema = new Schema<TimelineEvent>(
  {
    location: AuthorLocationSchema,
    notes: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  { _id: false }
);

const PortraitDataSchema = new Schema<PortraitData>(
  {
    src: { type: String },
  },
  { _id: false }
);

const TimeSpanSchema = new Schema<TimeSpan>(
  {
    startDate: { type: String },
    endDate: { type: String },
  },
  { _id: false }
);

const AuthorGroupSchema = new Schema<AuthorGroup>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  span: {
    type: TimeSpanSchema,
  },
  link: { type: String },
});

const AuthorGroupModelName = 'AuthorGroup';

export const AuthorGroupModel: Model<AuthorGroup> =
  models[AuthorGroupModelName] ||
  model(AuthorGroupModelName, AuthorGroupSchema);

const AuthorSchema = new Schema<Author>({
  id: { type: String, required: true, unique: true },
  authorFirstName: { type: String, required: true },
  authorLastName: { type: String, required: true },
  authorFullName: { type: String },
  authorDisplayName: { type: String },
  birthDate: { type: MilestoneEventSchema, required: true },
  deathDate: { type: MilestoneEventSchema },
  timeline: [{ type: TimelineEventSchema }],
  link: {
    type: String,
  },
  portrait: { type: PortraitDataSchema },
  groups: [{ type: String }],
});

const AuthorModelName = 'Author';

export const AuthorModel: Model<Author> =
  models[AuthorModelName] || model(AuthorModelName, AuthorSchema);
