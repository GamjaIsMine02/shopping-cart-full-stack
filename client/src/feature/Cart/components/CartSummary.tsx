import { useCartContext } from '../context/CartContext';
import { CartSummaryLine } from './CartSummaryLine';

export const CartSummary = () => {
  const { cartItems, selectedCartItemIds } = useCartContext();

  // 선택된 상품 가져오기
  const selectedCartItems = cartItems.filter((value) =>
    selectedCartItemIds.includes(value.cartItemId),
  );

  // 주문 금액 계산
  const orderPrice = selectedCartItems.reduce(
    (acc, cartItem) => acc + cartItem.productPrice * cartItem.purchaseQuantity,
    0,
  );

  // 배송비 계산
  const deliveryPrice = orderPrice >= 100000 || orderPrice <= 0 ? 0 : 3000;

  // 총 결제 금액 계산
  const totalPrice = orderPrice + deliveryPrice;

  return (
    <div>
      <span>배송비는 3000원</span>
      <CartSummaryLine title="주문 금액" value={orderPrice} />
      <CartSummaryLine title="배송비" value={deliveryPrice} />
      <hr />
      <CartSummaryLine title="총 결제 금액" value={totalPrice} />
    </div>
  );
};
