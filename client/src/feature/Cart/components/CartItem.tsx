import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import { QuantityStepper } from './QuantityStepper';

type CartItemProps = {
  value: CartItemResponse;
  isSelected: boolean;
  onToggle: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const CartItem = ({
  value,
  isSelected,
  onToggle,
  onDecrease,
  onIncrease,
}: CartItemProps) => {
  return (
    <div>
      <input type="checkbox" checked={isSelected} onChange={onToggle} />
      <QuantityStepper
        quantity={value.purchaseQuantity}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
      />
      <div>imgUrl</div>
      <div>{value.productName}</div>
      <div>{value.productPrice}</div>
    </div>
  );
};
