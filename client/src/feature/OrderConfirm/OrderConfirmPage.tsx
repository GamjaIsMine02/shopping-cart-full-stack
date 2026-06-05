import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import type { CartOrderSummary } from '../Cart/types/orderSummary.types';
import { Container, Wrapper } from '../../common/styles/global';
import { OrderContent } from './components/OrderConfirmContent';
import styled from 'styled-components';

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

        <ContentArea>
          <OrderContent orderSummary={orderSummary} />
        </ContentArea>

        <ButtonArea>
          <Button type="button" disabled>
            결제하기
          </Button>
        </ButtonArea>
      </Container>
    </Wrapper>
  );
};

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 0 20px;
`;

const ButtonArea = styled.div`
  flex-shrink: 0;

  background-color: #ffffff;
`;
