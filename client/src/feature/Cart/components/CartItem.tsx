import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import { QuantityStepper } from './QuantityStepper';
import styled from 'styled-components';

type CartItemProps = {
  value: CartItemResponse;
  isSelected: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const CartItem = ({
  value,
  isSelected,
  onToggle,
  onDelete,
  onDecrease,
  onIncrease,
}: CartItemProps) => {
  return (
    <ItemContainer>
      <Checkbox type="checkbox" checked={isSelected} onChange={onToggle} />

      <ItemContent>
        <ProductImage src={value.imageUrl} alt={value.productName} />
        <ProductInfo>
          <ProductName>{value.productName}</ProductName>
          <ProductPrice>{value.productPrice.toLocaleString()}원</ProductPrice>
          <QuantityStepper
            quantity={value.purchaseQuantity}
            isDecreaseDisabled={value.purchaseQuantity <= 1}
            isIncreaseDisabled={
              value.purchaseQuantity >= value.remainingQuantity ||
              value.purchaseQuantity >= 99
            }
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
        </ProductInfo>
      </ItemContent>

      <DeleteButton type="button" onClick={onDelete}>
        삭제
      </DeleteButton>
    </ItemContainer>
  );
};

const ItemContainer = styled.article`
  position: relative;

  display: grid;
  grid-template-columns: 22px 1fr;
  column-gap: 14px;

  padding: 16px 0;
  border-top: 1px solid #eeeeee;
`;

const Checkbox = styled.input`
  width: 22px;
  height: 22px;
  margin: 0;

  accent-color: #000000;
`;

const ItemContent = styled.div`
  display: flex;
  gap: 16px;
  min-width: 0;
`;

const ProductImage = styled.img`
  flex: 0 0 auto;

  width: 98px;
  height: 98px;
  border-radius: 6px;

  object-fit: cover;
  background-color: #f2f2f2;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  min-width: 0;
`;

const ProductName = styled.div`
  overflow: hidden;

  color: #000000;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductPrice = styled.div`
  color: #000000;
  font-size: 25px;
  font-weight: 900;
  line-height: 1.1;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 0;

  padding: 4px 8px;
  border: 1px solid #dddddd;
  border-radius: 4px;

  background-color: #ffffff;
  color: #000000;

  font-size: 11px;
  font-weight: 600;
`;
