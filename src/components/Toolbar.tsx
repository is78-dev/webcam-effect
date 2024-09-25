import React from "react";
import { EffectSetting } from "../types/Setting";
import ModeSelect from "./ModeSelect";
import AsciiSetting from "./AsciiSetting";
import ThresholdSetting from "./ThresholdSetting";
import DitheringSetting from "./DitheringSetting";

type ToolbarProps = {
  cameraAccess: boolean;
  setCameraAccess: React.Dispatch<React.SetStateAction<boolean>>;
  effectSetting: EffectSetting;
  setEffectSetting: React.Dispatch<React.SetStateAction<EffectSetting>>;
};

const Toolbar = ({
  cameraAccess,
  setCameraAccess,
  effectSetting,
  setEffectSetting,
}: ToolbarProps) => {
  return (
    <div className="h-screen w-1/4 bg-white">
      <button
        onClick={() => setCameraAccess(!cameraAccess)}
        className="text-4xl"
      >
        📷
      </button>
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
