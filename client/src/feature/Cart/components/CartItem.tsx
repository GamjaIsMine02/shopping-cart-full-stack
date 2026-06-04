import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import { QuantityStepper } from './QuantityStepper';

type CartItemProps = {
  value: CartItemResponse;
  isSelected: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const CartItem = ({
  value,
  isSelected,
  onToggle,
  onDelete,
  onDecrease,
  onIncrease,
}: CartItemProps) => {
  return (
    <div>
      <input type="checkbox" checked={isSelected} onChange={onToggle} />
      <button onClick={onDelete}>삭제</button>
      <QuantityStepper
        quantity={value.purchaseQuantity}
        isDecreaseDisabled={value.purchaseQuantity <= 1}
        isIncreaseDisabled={
          value.purchaseQuantity >= value.remainingQuantity ||
          value.purchaseQuantity >= 99
        }
        onDecrease={onDecrease}
        onIncrease={onIncrease}
      />
      <div>imgUrl</div>
      <div>{value.productName}</div>
      <div>{value.productPrice}</div>
    </div>
  );
};
