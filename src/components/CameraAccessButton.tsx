import React from "react";
import { LuCamera } from "react-icons/lu";
import { LuCameraOff } from "react-icons/lu";

type CameraAccessButtonProps = {
  cameraAccess: boolean;
  setCameraAccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const CameraAccessButton = ({
  cameraAccess,
  setCameraAccess,
}: CameraAccessButtonProps) => {
  return (
    <button
      onClick={() => setCameraAccess(!cameraAccess)}
      className="p-3 rounded-full border-2 border-black hover:bg-gray-100"
    >
      {cameraAccess ? (
        <LuCameraOff size="40" color="black" className="stroke-[1.5]" />
      ) : (
        <LuCamera size="40" color="black" className="stroke-[1.5]" />
      )}
    </button>
  );
};

export default CameraAccessButton;
