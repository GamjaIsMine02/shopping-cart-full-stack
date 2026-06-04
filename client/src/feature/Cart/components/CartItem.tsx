import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import { QuantityStepper } from './QuantityStepper';

export const CartItem = ({ value }: { value: CartItemResponse }) => {
  return (
    <div>
      <button>체크</button>
      <QuantityStepper />
      <div>imgUrl</div>
      <div>{value.productName}</div>
      <div>{value.productPrice}</div>
    </div>
  );
};
