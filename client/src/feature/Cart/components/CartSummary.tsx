import { CartSummaryLine } from './CartSummaryLine';

export const CartSummary = () => {
  return (
    <div>
      <span>배송비는 3000원</span>
      <CartSummaryLine />
      <CartSummaryLine />
      <CartSummaryLine />
    </div>
  );
};
