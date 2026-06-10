import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import { useCartContext } from '../context/CartContext';
import { CartItem } from './CartItem';
import styled from 'styled-components';

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

  const handleDeleteCartItem = (cartItem: CartItemResponse) => {
    const isConfirmed = window.confirm(
      `'${cartItem.productName}' 상품을 장바구니에서 삭제하시겠습니까?`,
    );

    if (!isConfirmed) return;

    deleteCartItem(cartItem.cartItemId);
  };

  return (
    <Section>
      <SectionHeader>
        <Title>장바구니</Title>
        <Description>
          현재 {cartItems.length}종류의 상품이 담겨있습니다.
        </Description>
      </SectionHeader>

      <SelectAllLabel>
        <Checkbox
          type="checkbox"
          checked={isAllSelected}
          onChange={toggleAllCartItems}
        />
        <SelectAllText>전체선택</SelectAllText>
      </SelectAllLabel>

      <List>
        {cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.cartItemId}
            value={cartItem}
            isSelected={selectedCartItemIds.includes(cartItem.cartItemId)}
            onToggle={() => toggleCartItem(cartItem.cartItemId)}
            onDelete={() => handleDeleteCartItem(cartItem)}
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
      </List>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
`;

const Title = styled.h1`
  margin: 0;

  color: #000000;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;

  color: #000000;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.4;
`;

const SelectAllLabel = styled.label`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 8px;

  margin-bottom: 16px;
`;

const Checkbox = styled.input`
  width: 22px;
  height: 22px;
  margin: 0;

  accent-color: #000000;
`;

const SelectAllText = styled.span`
  font-size: 12px;
  font-weight: 700;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;
