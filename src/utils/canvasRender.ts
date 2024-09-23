import { EffectSetting } from "../types/Setting";

const original = (
  width: number,
  height: number,
  imageData: ImageData,
  context: CanvasRenderingContext2D,
  effectSetting: EffectSetting
) => {
  context.putImageData(imageData, 0, 0);
};

const grayscale = (
  width: number,
  height: number,
  imageData: ImageData,
  context: CanvasRenderingContext2D,
  effectSetting: EffectSetting
) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (width * y + x) * 4;
      const red = imageData.data[offset];
      const green = imageData.data[offset + 1];
      const blue = imageData.data[offset + 2];
      let gray = 0.299 * red + 0.587 * green + 0.114 * blue;
      imageData.data[offset] =
        imageData.data[offset + 1] =
        imageData.data[offset + 2] =
          gray;
    }
  }
  context.putImageData(imageData, 0, 0);
};

const threshold = (
  width: number,
  height: number,
  imageData: ImageData,
  context: CanvasRenderingContext2D,
  effectSetting: EffectSetting
) => {
  const threshold = 128;
  for (let y = 0; y < height; y++) {
    let prev = 0;
    for (let x = 0; x < width; x++) {
      const offset = (width * y + x) * 4;
      const red = imageData.data[offset];
      const green = imageData.data[offset + 1];
      const blue = imageData.data[offset + 2];
      let gray = 0.299 * red + 0.587 * green + 0.114 * blue;
      gray += prev;
      if (gray < threshold) {
        imageData.data[offset] =
          imageData.data[offset + 1] =
          imageData.data[offset + 2] =
            0;
        prev = gray;
      } else {
        imageData.data[offset] =
          imageData.data[offset + 1] =
          imageData.data[offset + 2] =
            255;
        prev = gray - 255;
      }
    }
  }

  context.putImageData(imageData, 0, 0);
};

export const canvasRender = (
  width: number,
  height: number,
  imageData: ImageData,
  context: CanvasRenderingContext2D,
  effectSetting: EffectSetting
) => {
  switch (effectSetting.mode) {
    case "original":
      original(width, height, imageData, context, effectSetting);
      break;
    case "grayscale":
      grayscale(width, height, imageData, context, effectSetting);
      break;
    case "threshold":
      threshold(width, height, imageData, context, effectSetting);
      break;
  }
};
