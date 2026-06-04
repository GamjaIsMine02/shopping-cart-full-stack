import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import { CartItem } from './CartItem';

export const CartItemListSection = ({
  values,
}: {
  values: CartItemResponse[];
}) => {
  return (
    <div>
      <span>장바구니</span>
      <span>현재 {values.length}개의 상품이 담겨있습니다.</span>

      <button>전체 선택</button>
      {values.map((value) => (
        <CartItem value={value} />
      ))}
    </div>
  );
};
