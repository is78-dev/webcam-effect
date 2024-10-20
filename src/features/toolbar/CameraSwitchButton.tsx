import React from "react";
import { LuSwitchCamera } from "react-icons/lu";

type CameraSwitchButtonProps = {
  cameraSwitch: boolean;
  setCameraSwitch: React.Dispatch<React.SetStateAction<boolean>>;
};

const CameraSwitchButton = ({
  cameraSwitch,
  setCameraSwitch,
}: CameraSwitchButtonProps) => {
  return (
    <button
      onClick={() => setCameraSwitch(!cameraSwitch)}
      className="p-3 rounded-full border-2 border-black hover:bg-gray-100"
    >
      <LuSwitchCamera size="40" color="black" className="stroke-[1.5]" />
    </button>
  );
};

export default CameraSwitchButton;
