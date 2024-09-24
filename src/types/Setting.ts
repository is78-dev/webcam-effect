export const modes = [
  "original",
  "grayscale",
  "threshold",
  "dithering",
  "ascii",
] as const;
export type Mode = (typeof modes)[number];
export type EffectSetting = {
  mode: Mode;
};
