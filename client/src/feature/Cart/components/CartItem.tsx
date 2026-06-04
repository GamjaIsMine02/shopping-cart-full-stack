import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import { QuantityStepper } from './QuantityStepper';

export const CartItem = ({
  value,
  selectedCartItemIds,
  onClickSelect,
}: {
  value: CartItemResponse;
  selectedCartItemIds: string[];
  onClickSelect: (cartItemId: string) => void;
}) => {
  const isSelected = selectedCartItemIds.includes(value.cartItemId);

  return (
    <div>
      <input
        type="checkbox"
        checked={isSelected}
        onClick={() => onClickSelect(value.cartItemId)}
      />
      <QuantityStepper quantity={value.purchaseQuantity} />
      <div>imgUrl</div>
      <div>{value.productName}</div>
      <div>{value.productPrice}</div>
    </div>
  );
};
