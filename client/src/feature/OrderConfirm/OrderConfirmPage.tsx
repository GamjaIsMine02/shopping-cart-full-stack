import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import type { CartOrderSummary } from '../Cart/types/orderSummary.types';
import { Container, Wrapper } from '../../common/styles/global';
import { OrderContent } from './components/OrderConfirmContent';

export const OrderConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderSummary = location.state as CartOrderSummary | null;

  if (orderSummary === null) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <Wrapper>
      <Container>
        <Header
          left={
            <button type="button" onClick={() => navigate('/cart')}>
              ←
            </button>
          }
        />

        <OrderContent orderSummary={orderSummary} />
        <Button type="button" disabled>
          결제하기
        </Button>
      </Container>
    </Wrapper>
  );
};
