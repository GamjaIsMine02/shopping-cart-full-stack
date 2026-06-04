import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import { CartItemListSection } from './components/CartItemListSection';
import { CartSummary } from './components/CartSummary';
import { useCart } from './hooks/useCart';

export const CartPage = () => {
  const cart = useCart();

  return (
    <div>
      <Header title="SHOP" />
      <CartItemListSection values={cart.cartItems} />
      <CartSummary
        values={cart.cartItems}
        selectedIds={cart.selectedCartItemIds}
      />
      {/* <Button /> */}
    </div>
  );
};
