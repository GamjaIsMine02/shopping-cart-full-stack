import { Button } from '../../common/components/Button';
import { Header } from '../../common/components/Header';
import { CartItemListSection } from './components/CartItemListSection';
import { CartSummary } from './components/CartSummary';

export const CartPage = () => {
  return (
    <div>
      <Header title="SHOP" />
      <CartItemListSection />
      <CartSummary />
      {/* <Button /> */}
    </div>
  );
};
