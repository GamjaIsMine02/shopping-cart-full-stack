import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import { CartItemListSection } from './components/CartItemListSection';
import { CartProvider } from './components/CartProvider';
import { CartSummary } from './components/CartSummary';

export const CartPage = () => {
  return (
    <CartProvider>
      <Header title="SHOP" />
      <CartItemListSection />
      <CartSummary />
      {/* <Button /> */}
    </CartProvider>
  );
};
