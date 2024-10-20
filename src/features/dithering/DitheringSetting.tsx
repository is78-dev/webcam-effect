import React, { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import { EffectSetting } from "../../types/Setting";

type DitheringSettingProps = {
  effectSetting: EffectSetting;
  setEffectSetting: React.Dispatch<React.SetStateAction<EffectSetting>>;
};

const DitheringSetting = ({
  effectSetting,
  setEffectSetting,
}: DitheringSettingProps) => {
  const [threshold, setThreshold] = useState<number>(128);

  useEffect(() => {
    setEffectSetting({
      ...effectSetting,
      dithering: { threshold: threshold },
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

export default DitheringSetting;
