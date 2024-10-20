import React from "react";
import { EffectSetting } from "../../types/Setting";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { canvasRender } from "./canvasRender";

type ScreenProps = {
  mediaStream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  effectSetting: EffectSetting;
};

const Screen = ({
  mediaStream,
  videoRef,
  canvasRef,
  effectSetting,
}: ScreenProps) => {
  const updateCanvas = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const width = canvas.width;
    const height = canvas.height;

    ctx.drawImage(videoRef.current!, 0, 0, width, height); // canvasにカメラ映像を描画
    const imageData = ctx.getImageData(0, 0, width, height); // 画素値の配列を取得
    ctx.clearRect(0, 0, width, height); // canvasからカメラ映像を削除

    canvasRender(width, height, imageData, ctx, effectSetting); // effectSettingに応じた描画処理
  };

  const endUpdateCanvas = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useAnimationFrame(!!mediaStream, updateCanvas, endUpdateCanvas);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <video ref={videoRef} className="hidden"></video>
      <canvas ref={canvasRef} className="max-w-full"></canvas>
    </div>
  );
};

export default Screen;
