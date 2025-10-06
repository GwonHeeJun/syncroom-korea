import { z } from "zod";

const avatarSchema = z.object({
  type: z.enum(["url", "preset"]).optional(),
  preset: z.object({
    colorCode: z.string(),
    shapeKey: z.string(),
  }).optional(),
  url: z.string().optional(),
}).optional();

const lastPlayedPartSchema = z.object({
  part: z.string().optional(),
  customPart: z.string().optional(),
}).optional();

const baseMemberSchema = z.object({
  userId: z.string(),
  nickname: z.string(),
  idProvider: z.enum(["ymid-jp", "ymid-kr", ""]).nullable(),
  avatar: avatarSchema,
  isBeginner: z.boolean(),
  lastPlayedPart: lastPlayedPartSchema,
});

export const memberSchema = baseMemberSchema.extend({
  roomEnterType: z.string(),
});

export type Member = z.infer<typeof memberSchema>;

export const creatorSchema = baseMemberSchema;

export type Creator = z.infer<typeof creatorSchema>;
