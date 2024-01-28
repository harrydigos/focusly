export const SPACES = [
  "lofi_girl",
  "spirited_away_train",
  "lofi_girl_balcony",
  "train",
] as const;

export type Space = (typeof SPACES)[number];
