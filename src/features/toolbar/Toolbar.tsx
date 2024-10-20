import React from "react";
import { EffectSetting } from "../../types/Setting";
import ModeSelect from "./ModeSelect";
import AsciiSetting from "../ascii/AsciiSetting";
import ThresholdSetting from "../threshold/ThresholdSetting";
import DitheringSetting from "../dithering/DitheringSetting";
import CameraAccessButton from "./CameraAccessButton";
import CameraSwitchButton from "./CameraSwitchButton";
import DownloadButton from "./DownloadButton";

type ToolbarProps = {
  cameraAccess: boolean;
  setCameraAccess: React.Dispatch<React.SetStateAction<boolean>>;
  outCamera: boolean;
  setOutCamera: React.Dispatch<React.SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  effectSetting: EffectSetting;
  setEffectSetting: React.Dispatch<React.SetStateAction<EffectSetting>>;
};

const Toolbar = ({
  cameraAccess,
  setCameraAccess,
  outCamera,
  setOutCamera,
  canvasRef,
  effectSetting,
  setEffectSetting,
}: ToolbarProps) => {
  return (
    <div className="h-screen w-1/4 bg-white">
      <div className="m-3 flex justify-center items-center gap-3 flex-wrap">
        <CameraAccessButton
          cameraAccess={cameraAccess}
          setCameraAccess={setCameraAccess}
        />
        <DownloadButton canvasRef={canvasRef} />
        <CameraSwitchButton
          cameraSwitch={outCamera}
          setCameraSwitch={setOutCamera}
        />
      </div>

      <ModeSelect
        effectSetting={effectSetting}
        setEffectSetting={setEffectSetting}
      />
      {effectSetting.mode === "threshold" && (
        <ThresholdSetting
          effectSetting={effectSetting}
          setEffectSetting={setEffectSetting}
        />
      )}
      {effectSetting.mode === "dithering" && (
        <DitheringSetting
          effectSetting={effectSetting}
          setEffectSetting={setEffectSetting}
        />
      )}
      {effectSetting.mode === "ascii" && (
        <AsciiSetting
          effectSetting={effectSetting}
          setEffectSetting={setEffectSetting}
        />
      )}
    </div>
  );
};

export default Toolbar;
