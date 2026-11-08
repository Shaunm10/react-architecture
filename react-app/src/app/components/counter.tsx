import { useState } from 'react';

export type CounterProps = {
  initialValue: number;
  label: string;
  onIncrement?: (newValue: number) => void;
  onDecrement?: (newValue: number) => void;
};

const Counter = ({
  initialValue,
  label,
  onIncrement,
  onDecrement,
}: CounterProps) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    onIncrement?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = value - 1;

    setValue(newValue);
    onDecrement?.(newValue);
  };
  return (
    <div>
      <label>{label}</label>
      <div className="flex items-center gap-2">
        <button onClick={handleIncrement}>+</button>
        <p>{value}</p>
        <button onClick={handleDecrement}>-</button>
      </div>
    </div>
  );
};

export default Counter;
