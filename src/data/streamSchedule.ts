export type StreamSlot = {
  date: string;
  time: string;
  note?: string;
};

export const streamSchedule: StreamSlot[] = [];

export type SpecialStream = {
  date: string;
  time: string;
  title: string;
  note: string;
};

export const specialStream: SpecialStream | null = null;
