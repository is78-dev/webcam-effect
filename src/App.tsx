import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Toolbar from "./components/Toolbar";
import Screen from "./components/Screen";
import { useUserMedia } from "./hooks/useUserMedia";
import { EffectSetting } from "./types/Setting";

const App = () => {
  const { cameraAccess, setCameraAccess, mediaStream, canvasRef, videoRef } =
    useUserMedia();
  const [effectSetting, setEffectSetting] = useState<EffectSetting>({
    mode: "grayscale",
  });

  return (
    <main className="flex bg-[#333]">
      <Toolbar
        cameraAccess={cameraAccess}
        setCameraAccess={setCameraAccess}
        effectSetting={effectSetting}
        setEffectSetting={setEffectSetting}
      />
      <Screen
        mediaStream={mediaStream}
        videoRef={videoRef}
        canvasRef={canvasRef}
        effectSetting={effectSetting}
      />
    </main>
  );
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
