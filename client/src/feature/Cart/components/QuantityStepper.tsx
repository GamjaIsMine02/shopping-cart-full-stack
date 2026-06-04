export const QuantityStepper = ({ quantity }: { quantity: number }) => {
  return (
    <div>
      <button>-</button>
      {quantity}
      <button>+</button>
    </div>
  );
};
