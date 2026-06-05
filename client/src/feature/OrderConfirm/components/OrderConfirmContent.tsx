import type { CartOrderSummary } from '../../Cart/types/orderSummary.types';

export const OrderContent = ({
  orderSummary,
}: {
  orderSummary: CartOrderSummary;
}) => {
  return (
    <div>
      <main>
        <h1>주문 확인</h1>
        <p>
          총 {orderSummary.productKindCount}종류의 상품{' '}
          {orderSummary.totalProductCount}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>

        <section>
          <h2>총 결제 금액</h2>
          <strong>{orderSummary.totalPrice.toLocaleString()}원</strong>
        </section>
      </main>
    </div>
  );
};
