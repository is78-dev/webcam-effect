import React from "react";
import { LuDownload } from "react-icons/lu";

type DownloadButtonProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

const DownloadButton = ({ canvasRef }: DownloadButtonProps) => {
  const getCurrentTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 月は0始まりなので+1
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  const handleDownload = () => {
    let downloadLink = document.createElement("a");
    downloadLink.href = canvasRef.current!.toDataURL("image/png");
    downloadLink.download = `webcam-effect_${getCurrentTimestamp()}.png`;
    downloadLink.click();
  };
  return (
    <button
      onClick={handleDownload}
      className="p-3 rounded-full border-2 border-black hover:bg-gray-100"
    >
      <LuDownload size="40" color="black" className="stroke-[1.5]" />
    </button>
  );
};

export default DownloadButton;
