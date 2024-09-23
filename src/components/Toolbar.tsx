import React from "react";
import { EffectSetting } from "../types/Setting";

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
    <div className="h-screen w-20">
      <button
        onClick={() => setCameraAccess(!cameraAccess)}
        className="text-4xl"
      >
        📷
      </button>
    </div>
  );
};

export default Toolbar;
