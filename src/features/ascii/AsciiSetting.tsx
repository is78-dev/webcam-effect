import React, { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import Text from "../../components/Text";
import { EffectSetting } from "../../types/Setting";

type AsciiSettingProps = {
  effectSetting: EffectSetting;
  setEffectSetting: React.Dispatch<React.SetStateAction<EffectSetting>>;
};

const AsciiSetting = ({
  effectSetting,
  setEffectSetting,
}: AsciiSettingProps) => {
  const [fontSize, setFontSize] = useState<number>(8);
  const [text, setText] = useState<string>("@#=|:.");

  useEffect(() => {
    setEffectSetting({
      ...effectSetting,
      ascii: { fontSize: fontSize, text: text },
    });
  }, [fontSize, text]);
  return (
    <div>
      <Slider
        name="フォントサイズ"
        value={fontSize}
        setValue={setFontSize}
        min={4}
        max={32}
      />
      <Text name="テキスト(黒-->白)" value={text} setValue={setText} />
    </div>
  );
};

export default AsciiSetting;
