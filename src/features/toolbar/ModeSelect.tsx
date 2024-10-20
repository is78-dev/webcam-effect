import React, { useState } from "react";
import { EffectSetting, Mode, modes } from "../../types/Setting";

type ModeSelectProps = {
  effectSetting: EffectSetting;
  setEffectSetting: React.Dispatch<React.SetStateAction<EffectSetting>>;
};

const ModeSelect = ({ effectSetting, setEffectSetting }: ModeSelectProps) => {
  const [selectedMode, setSelectedMode] = useState<Mode>("original");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = event.target.value as Mode;
    setEffectSetting({ ...effectSetting, mode: newMode });
    setSelectedMode(newMode);
  };
  return (
    <div>
      <label htmlFor="mode-select" className="block">
        モード
      </label>
      <select id="mode-select" value={selectedMode} onChange={handleChange}>
        {modes.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModeSelect;
