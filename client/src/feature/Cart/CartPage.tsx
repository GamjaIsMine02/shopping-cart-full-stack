import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import { CartItemListSection } from './components/CartItemListSection';
import { CartEmptyView } from './components/CartEmptyView';
import { CartErrorView } from './components/CartErrorView';
import { CartSkeleton } from './components/CartSkeleton';
import { CartSummary } from './components/CartSummary';
import { useCartContext } from './context/CartContext';
import { calculateCartOrderSummary } from './utils/calculateCartOrderSummary';
import { CartProvider } from './context/CartProvider';
import { Container, Wrapper } from '../../common/styles/global';
import styled from 'styled-components';

export const CartPage = () => {
  return (
    <Wrapper>
      <Container>
        <CartProvider>
          <Header title="SHOP" />
          <CartOrderForm />
        </CartProvider>
      </Container>
    </Wrapper>
  );
};

// 페이지 이동을 위한 Form 컴포넌트
const CartOrderForm = () => {
  const navigate = useNavigate();
  const { cartItems, selectedCartItemIds, cartFetchStatus, cartFetchError } =
    useCartContext();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const orderSummary = calculateCartOrderSummary(
      cartItems,
      selectedCartItemIds,
    );

    navigate('/order-confirm', { state: orderSummary });
  };

  const isOrderDisabled =
    cartFetchStatus !== 'success' || selectedCartItemIds.length === 0;

  return (
    <OrderForm onSubmit={handleSubmit}>
      <CartScrollArea>
        <CartContent />
      </CartScrollArea>

      <ButtonArea>
        {cartFetchError && <p role="alert">{cartFetchError.message}</p>}
        <Button type="submit" disabled={isOrderDisabled}>
          주문 확인
        </Button>
      </ButtonArea>
    </OrderForm>
  );
};

const CartContent = () => {
  const { cartItems, cartFetchStatus, cartFetchError, loadCartItems } =
    useCartContext();

  if (cartFetchStatus === 'idle' || cartFetchStatus === 'loading') {
    return <CartSkeleton />;
  }

  if (cartFetchStatus === 'error') {
    return <CartErrorView error={cartFetchError} onRetry={loadCartItems} />;
  }

  if (cartItems.length === 0) {
    return <CartEmptyView />;
  }

  return (
    <>
      <CartItemListSection />
      <CartSummary />
    </>
  );
};

const OrderForm = styled.form`
  display: flex;
  flex-direction: column;

  flex: 1;
  min-height: 0;
`;

const CartScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  padding: 24px 20px 16px;
`;

const ButtonArea = styled.div`
  flex-shrink: 0;

  background-color: #ffffff;
`;
