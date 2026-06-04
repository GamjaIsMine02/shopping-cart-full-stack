import { useCartContext } from '../context/CartContext';
import { calculateCartOrderSummary } from '../utils/calculateCartOrderSummary';
import { CartSummaryLine } from './CartSummaryLine';

export const CartSummary = () => {
  const { cartItems, selectedCartItemIds } = useCartContext();
  const { orderPrice, deliveryPrice, totalPrice } = calculateCartOrderSummary(
    cartItems,
    selectedCartItemIds,
  );

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
