type QuantityStepperProps = {
  quantity: number;
  isDecreaseDisabled: boolean;
  isIncreaseDisabled: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const QuantityStepper = ({
  quantity,
  isDecreaseDisabled,
  isIncreaseDisabled,
  onDecrease,
  onIncrease,
}: QuantityStepperProps) => {
  return (
    <div>
      <button type="button" disabled={isDecreaseDisabled} onClick={onDecrease}>
        -
      </button>
      <span>{quantity}</span>
      <button type="button" disabled={isIncreaseDisabled} onClick={onIncrease}>
        +
      </button>
    </div>
  );
};
