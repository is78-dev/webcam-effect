import React, { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import { EffectSetting } from "../../types/Setting";
import ColorPicker from "../../components/ColorPicker";

type ThresholdSettingProps = {
  effectSetting: EffectSetting;
  setEffectSetting: React.Dispatch<React.SetStateAction<EffectSetting>>;
};

const ThresholdSetting = ({
  effectSetting,
  setEffectSetting,
}: ThresholdSettingProps) => {
  const [threshold, setThreshold] = useState<number>(128);

  useEffect(() => {
    setEffectSetting({
      ...effectSetting,
      threshold: {
        threshold: threshold, 
        color1: effectSetting.threshold?.color1 || "#000000",
        color2: effectSetting.threshold?.color2 || "#ffffff",
      },
    });
  }, [threshold]);

  const setColor1 = (color: string) => {
    setEffectSetting({...effectSetting, threshold: {
      threshold: threshold, 
      color1: color,
      color2: effectSetting.threshold?.color2 || "#ffffff",
    },})
  };

  const setColor2 = (color: string) => {
    setEffectSetting({...effectSetting, threshold: {
      threshold: threshold, 
      color1: effectSetting.threshold?.color1 || "#000000",
      color2: color,
    },})
  };

  return (
    <div>
      <Slider
        name="閾値"
        value={threshold}
        setValue={setThreshold}
        min={0}
        max={256}
      />
      <ColorPicker 
        onChange={setColor1} 
        label="カラー1（黒）" 
        defaultColor="#000000"
      />
      <ColorPicker 
        onChange={setColor2} 
        label="カラー2（白）" 
        defaultColor="#ffffff"
      />
    </div>
  );
};

export default ThresholdSetting;
