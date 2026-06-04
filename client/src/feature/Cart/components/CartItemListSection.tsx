import { useCartContext } from '../context/CartContext';
import { CartItem } from './CartItem';

export const CartItemListSection = () => {
  const {
    cartItems,
    selectedCartItemIds,
    isAllSelected,
    changeCartItemQuantity,
    deleteCartItem,
    toggleAllCartItems,
    toggleCartItem,
  } = useCartContext();

  return (
    <div>
      <span>장바구니</span>
      <span>현재 {cartItems.length}개의 상품이 담겨있습니다.</span>

      <input
        type="checkbox"
        checked={isAllSelected}
        onChange={toggleAllCartItems}
      />
      <label htmlFor="">전체 선택</label>
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.cartItemId}
          value={cartItem}
          isSelected={selectedCartItemIds.includes(cartItem.cartItemId)}
          onToggle={() => toggleCartItem(cartItem.cartItemId)}
          onDelete={() => {
            const isConfirmed = window.confirm(
              `'${cartItem.productName}' 상품을 장바구니에서 삭제하시겠습니까?`,
            );

            if (!isConfirmed) return;

            deleteCartItem(cartItem.cartItemId);
          }}
          onIncrease={() =>
            changeCartItemQuantity(
              cartItem.cartItemId,
              cartItem.purchaseQuantity + 1,
            )
          }
          onDecrease={() =>
            changeCartItemQuantity(
              cartItem.cartItemId,
              cartItem.purchaseQuantity - 1,
            )
          }
        />
      ))}
    </div>
  );
};
