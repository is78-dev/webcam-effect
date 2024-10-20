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
  threshold?: {
    threshold: number;
    color1: string;
    color2: string;
  };
  dithering?: {
    threshold: number;
  };
  ascii?: {
    fontSize: number;
    text: string;
  };
};
