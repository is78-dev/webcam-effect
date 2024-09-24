export const modes = ["original", "grayscale", "threshold"] as const;
export type Mode = (typeof modes)[number];
export type EffectSetting = {
  mode: Mode;
};
