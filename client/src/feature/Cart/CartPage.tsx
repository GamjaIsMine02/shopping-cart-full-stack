import { Header } from '../../common/components/Header';
import { CartItemListSection } from './components/CartItemListSection';
import { CartEmptyView } from './components/CartEmptyView';
import { CartErrorView } from './components/CartErrorView';
import { CartProvider } from './components/CartProvider';
import { CartSkeleton } from './components/CartSkeleton';
import { CartSummary } from './components/CartSummary';
import { useCartContext } from './context/CartContext';
import { Button } from '../../common/components/Button';

export const CartPage = () => {
  return (
    <CartProvider>
      <Header title="SHOP" />
      <CartOrderForm />
    </CartProvider>
  );
};

// 페이지 이동을 위한 Form 컴포넌트
const CartOrderForm = () => {
  const { selectedCartItemIds, cartFetchStatus } = useCartContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 결제 확인 페이지로 이동 & 필요한 데이터 보내기
  };

  const isOrderDisabled =
    cartFetchStatus !== 'success' || selectedCartItemIds.length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <CartContent />
      <Button type="submit" disabled={isOrderDisabled}>
        주문 확인
      </Button>
    </form>
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
