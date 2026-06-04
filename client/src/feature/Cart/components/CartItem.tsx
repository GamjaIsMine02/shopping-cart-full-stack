import { QuantityStepper } from './QuantityStepper';

export const CartItem = () => {
  return (
    <div>
      <button>체크</button>
      <QuantityStepper />
      <div>img</div>
      <div>name</div>
      <div>price</div>
    </div>
  );
};
