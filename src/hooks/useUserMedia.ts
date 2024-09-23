import { useEffect, useRef, useState } from "react";

export const useUserMedia = () => {
  const [cameraAccess, setCameraAccess] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (cameraAccess) {
      (async () => {
        try {
          // カメラ映像の取得
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
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

  return {
    cameraAccess: cameraAccess,
    setCameraAccess: setCameraAccess,
    mediaStream: mediaStream,
    videoRef: videoRef,
    canvasRef: canvasRef,
  };
};
