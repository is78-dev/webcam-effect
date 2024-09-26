import React from "react";

type SliderProps = {
  name: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
};

const Slider = ({ name, value, setValue, ...sliderProps }: SliderProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div>
      <label htmlFor={`slider-${name}`}>{`${name}: ${value}`}</label>
      <input
        type="range"
        onChange={handleChange}
        id={`slider-${name}`}
        min={sliderProps.min}
        max={sliderProps.max}
        value={value}
        className="block max-w-full"
      />
    </div>
  );
};

export default Slider;
