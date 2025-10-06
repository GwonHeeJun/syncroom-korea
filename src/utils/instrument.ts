import type { Member, Instrument, Room } from "@/schema";

export const getInst = ({ lastPlayedPart }: Member): Instrument => {
  if (!lastPlayedPart || !lastPlayedPart.part) {
    return "other";
  }

  const part = lastPlayedPart.part;
  if (part === "vocal" || part === "guitar" || part === "bass" || part === "drum" || part === "keyboard") {
    return part;
  }
  return "other";
};

export const doesNotIncludeInst = (room: Room, inst: Instrument) =>
  room.members.every(member => getInst(member) !== inst);
