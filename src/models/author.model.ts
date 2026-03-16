import type {
  Author,
  AuthorAwardAchievement,
  AuthorGroup,
  AuthorLocation,
  AuthorWorkAchievement,
  MajorEvent,
  MilestoneEvent,
  PortraitData,
  TimelineEvent,
  TimeSpan,
} from 'author-map-ui';
import { model, Model, models, Schema } from 'mongoose';
import z, { ZodType } from 'zod';

const AuthorLocationSchema = new Schema<AuthorLocation>(
  {
    address: { type: String },
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

const AuthorAchievementSchema = new Schema<
  AuthorWorkAchievement | AuthorAwardAchievement
>(
  {
    type: { type: String, required: true },
    workTitle: { type: String },
    awardName: { type: String },
    referenceUrl: { type: String },
  },
  { _id: false }
);

const TimelineEventSchema = new Schema<TimelineEvent & MilestoneEvent>(
  {
    location: AuthorLocationSchema,
    notes: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    date: { type: String },
    achievement: AuthorAchievementSchema,
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

const AuthorMajorEventSchema = new Schema<MajorEvent>({
  ...MilestoneEventSchema.obj,
  id: { type: String, required: true, unique: true },
  referenceUrl: { type: String },
});

const AuthorMajorEventModelName = 'AuthorMajorEvent';

export const AuthorMajorEventModel: Model<MajorEvent> =
  models[AuthorMajorEventModelName] ||
  model(AuthorMajorEventModelName, AuthorMajorEventSchema);

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

// Validators

export const MilestoneEventValidator = z.object({
  date: z.iso.date(),
}) satisfies ZodType<MilestoneEvent>;

export const AuthorValidator = z.object({
  authorFirstName: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/)
    .max(100),
  authorLastName: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/)
    .max(100),
  birthDate: MilestoneEventValidator,
  timeline: z.array(
    z.xor([
      z.object({
        startDate: z.iso.date(),
        endDate: z.iso.date(),
      }) satisfies ZodType<TimelineEvent>,
      z.object({
        date: z.iso.date(),
      }) satisfies ZodType<MilestoneEvent>,
    ])
  ),
}) satisfies ZodType<Omit<Author, 'id'>>;

export const AuthorGroupValidator = z.object({
  name: z.string().max(100),
  description: z.string().max(4000),
}) satisfies ZodType<Omit<AuthorGroup, 'id'>>;
