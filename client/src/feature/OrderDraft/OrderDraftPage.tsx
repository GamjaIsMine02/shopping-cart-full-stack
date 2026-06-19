import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useOrder } from './hooks/useOrder';
import { OrderSuccessView } from './components/OrderSuccessView';
import { Header } from '../../common/components/Header';
import { Container, Wrapper } from '../../common/styles/global';
import { Button } from '../../common/components/Button';
import styled from 'styled-components';
import { OrderSkeletonView } from './components/OrderSkeletonView';
import { OrderErrorView } from './components/OrderErrorView';

export const OrderDraftPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = location.state as { orderId: string };

  const { data, isLoading, error, orderActionError, modalActionError } =
    useOrder(orderId);

  console.log(data);

  if (!orderId) {
    return <Navigate to="/cart" replace />;
  }

  const cartFetchStatus = isLoading ? 'loading' : error ? 'error' : 'success';

  const 비동기_상태에_따라_컴포넌트_보여주기 = () => {
    if (cartFetchStatus === 'loading') {
      return <OrderSkeletonView />;
    } else if (cartFetchStatus === 'error') {
      return <OrderErrorView />;
    } else if (cartFetchStatus === 'success') {
      return <OrderSuccessView data={data} />;
    }
  };

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
        <ContentArea>{비동기_상태에_따라_컴포넌트_보여주기()}</ContentArea>
        <ButtonArea>
          <Button disabled={isLoading}>결제하기</Button>
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
