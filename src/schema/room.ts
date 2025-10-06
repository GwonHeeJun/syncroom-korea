import { z } from "zod";
import { creatorSchema, memberSchema } from "./member";

export const roomSourceSchema = z.object({
  roomId: z.string(),
  name: z.string(),
  description: z.string(),
  roomPurpose: z.string(),
  roomPublishType: z.string(),
  needPasswd: z.boolean(),
  roomStatus: z.string(),
  tags: z.array(z.string()),
  customTags: z.array(z.string()),
  isTestRoom: z.boolean(),
  ownerUser: creatorSchema,
  members: z.array(memberSchema),
  maxMemberCount: z.number(),
  onlineDurationSecs: z.number(),
  onlinedAt: z.number(),
});

export type RoomSource = z.infer<typeof roomSourceSchema>;

export const roomSchema = roomSourceSchema;

export type Room = z.infer<typeof roomSchema>;
