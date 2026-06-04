type QuantityStepperProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const QuantityStepper = ({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityStepperProps) => {
  return (
    <div>
      <button type="button" onClick={onDecrease}>
        -
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={onIncrease}>
        +
      </button>
    </div>
  );
};
