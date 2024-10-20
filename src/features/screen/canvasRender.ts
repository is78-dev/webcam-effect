import { EffectSetting } from "../../types/Setting";
import { hexToRgb } from "../../utils/hexToRgb";

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
  const thr = effectSetting.threshold?.threshold || 128;
  const col1 = hexToRgb(effectSetting.threshold?.color1 || "#000000");
  const col2 = hexToRgb(effectSetting.threshold?.color2 || "#ffffff");
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (width * y + x) * 4;
      const red = imageData.data[offset];
      const green = imageData.data[offset + 1];
      const blue = imageData.data[offset + 2];
      let gray = 0.299 * red + 0.587 * green + 0.114 * blue;
      if (gray < thr) {
        imageData.data[offset] = col1?.r || 0;
        imageData.data[offset+1] = col1?.g || 0;
        imageData.data[offset+2] = col1?.b || 0;
      }
      else {
        imageData.data[offset] = col2?.r || 255;
        imageData.data[offset+1] = col2?.g || 255;
        imageData.data[offset+2] = col2?.b || 255;
      }
    }
  }
  context.putImageData(imageData, 0, 0);
};

const dithering = (
  width: number,
  height: number,
  imageData: ImageData,
  context: CanvasRenderingContext2D,
  effectSetting: EffectSetting
) => {
  const thr = effectSetting.dithering?.threshold!;
  for (let y = 0; y < height; y++) {
    let prev = 0;
    for (let x = 0; x < width; x++) {
      const offset = (width * y + x) * 4;
      const red = imageData.data[offset];
      const green = imageData.data[offset + 1];
      const blue = imageData.data[offset + 2];
      let gray = 0.299 * red + 0.587 * green + 0.114 * blue;
      gray += prev;
      if (gray < thr) {
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
  for (let y = 0; y < height; y++) {
    let prev = 0;
    for (let x = 0; x < width; x++) {
      const offset = (width * y + x) * 4;
      const red = imageData.data[offset];
      const green = imageData.data[offset + 1];
      const blue = imageData.data[offset + 2];
      let gray = 0.299 * red + 0.587 * green + 0.114 * blue;
      gray += prev;
      if (gray < thr) {
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

const ascii = (
  width: number,
  height: number,
  imageData: ImageData,
  context: CanvasRenderingContext2D,
  effectSetting: EffectSetting
) => {
  const cellSize = effectSetting.ascii!.fontSize;
  const numCols = Math.floor(width / cellSize);
  const numRows = Math.floor(height / cellSize);
  const chars = effectSetting.ascii!.text;

  context.font = `${cellSize}px monospace`;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, cellSize * numCols, cellSize * numRows);
  context.fillStyle = "#000000";
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const posX = x * cellSize;
      const posY = y * cellSize;

      const offset = (width * posY + posX) * 4;
      const red = imageData.data[offset];
      const green = imageData.data[offset + 1];
      const blue = imageData.data[offset + 2];
      const gray = 0.299 * red + 0.587 * green + 0.114 * blue;

      const charIndex = Math.floor((gray / 256) * chars.length);
      const char = chars[charIndex] || " ";

      context.fillText(char, posX, posY + cellSize);
    }
  }
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
    case "dithering":
      dithering(width, height, imageData, context, effectSetting);
      break;
    case "ascii":
      ascii(width, height, imageData, context, effectSetting);
      break;
  }
};
