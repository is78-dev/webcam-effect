import React from "react";

type TextProps = {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Text = ({ name, value, setValue, ...sliderProps }: TextProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor={`text-${name}`}>{name}</label>
      <input
        type="text"
        onChange={handleChange}
        id={`text-${name}`}
        value={value}
        className="block max-w-full rounded outline outline-2 outline-gray-300 focus:outline-blue-400"
      />
    </div>
  );
};

export default Text;
