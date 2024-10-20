import React, { useState } from "react";

type Props = {
  onChange: (color: string) => void;
  label?: string;
  defaultColor?: string;
}

const ColorPicker: React.FC<Props> = ({onChange, label, defaultColor}) => {
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor || "#ffffff");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setSelectedColor(color);
    onChange(color);
  }

  return (
    <div>
      {label && <label htmlFor={`colorPicker-${label}`} className="block">{label}</label>}
      <input
        id = {`colorPicker-${label}`}
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
        style={{ width: "70%", height: "50px" }}
      />
    </div>
      
  );
}

export default ColorPicker;