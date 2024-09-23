import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { useAnimationFrame } from "./hooks/useAnimationFrame";

const constraints = {
  audio: false,
  video: true,
};

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraAccess, setCameraAccess] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (cameraAccess) {
      (async () => {
        try {
          // カメラ映像の取得
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          videoRef.current!.srcObject = stream;
          setMediaStream(stream);
          await videoRef.current!.play();

          // canvasの大きさを調整
          const canvas = canvasRef.current!;
          canvas.width = videoRef.current!.videoWidth;
          canvas.height = videoRef.current!.videoHeight;
        } catch (error) {
          console.log("メディアの取得または再生に失敗しました。");
        }
      })();
    } else {
      if (mediaStream) {
        // canvasへの描画をクリア
        const canvas = canvasRef.current!;
        canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);

        // カメラへのアクセスを終了
        mediaStream.getTracks().forEach((track) => track.stop());
        videoRef.current!.srcObject = null;
        setMediaStream(null);
      }
    }

    return () => {
      // ページリロード時にカメラへのアクセスを終了させる
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraAccess]);

  const updateCanvas = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    ctx.drawImage(videoRef.current!, 0, 0, width, height); // canvasにカメラ映像を描画
    const imageData = ctx.getImageData(0, 0, width, height); // 画素値の配列を取得
    ctx.clearRect(0, 0, width, height); // canvasからカメラ映像を削除
  };

  useAnimationFrame(!!mediaStream, updateCanvas);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <video ref={videoRef} className="hidden"></video>
      <button
        onClick={() => setCameraAccess(!cameraAccess)}
        className="text-4xl"
      >
        📷
      </button>
    </>
  );
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
