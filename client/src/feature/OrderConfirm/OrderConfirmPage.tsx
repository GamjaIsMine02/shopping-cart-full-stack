import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import type { CartOrderSummary } from '../Cart/types/orderSummary.types';

export const OrderConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderSummary = location.state as CartOrderSummary | null;

  if (orderSummary === null) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div>
      <Header
        left={
          <button type="button" onClick={() => navigate('/cart')}>
            ←
          </button>
        }
      />

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

      <Button type="button" disabled>
        결제하기
      </Button>
    </div>
  );
};
