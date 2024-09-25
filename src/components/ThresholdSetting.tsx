import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import { EffectSetting } from "../types/Setting";

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
      threshold: { threshold: threshold },
    });
  }, [threshold]);

  return (
    <div>
      <Slider
        name="閾値"
        value={threshold}
        setValue={setThreshold}
        min={0}
        max={256}
      />
    </div>
  );
};

export default ThresholdSetting;
