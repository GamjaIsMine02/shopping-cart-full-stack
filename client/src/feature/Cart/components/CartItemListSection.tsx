import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import { CartItem } from './CartItem';

export const CartItemListSection = ({
  values,
  selectedCartItemIds,
  onClickAllSelect,
  onClickSelect,
}: {
  values: CartItemResponse[];
  selectedCartItemIds: CartItemResponse['cartItemId'][];
  onClickAllSelect: () => void;
  onClickSelect: (cartItemId: string) => void;
}) => {
  const isAllSelected =
    values.length > 0 &&
    values.every((cartItem) =>
      selectedCartItemIds.includes(cartItem.cartItemId),
    );

  return (
    <div>
      <span>장바구니</span>
      <span>현재 {values.length}개의 상품이 담겨있습니다.</span>

      <input
        type="checkbox"
        checked={isAllSelected}
        onClick={onClickAllSelect}
      />
      <label htmlFor="">전체 선택</label>
      {values.map((value) => (
        <CartItem
          value={value}
          selectedCartItemIds={selectedCartItemIds}
          onClickSelect={onClickSelect}
        />
      ))}
    </div>
  );
};
