import styled from 'styled-components';
import type { ReactNode } from 'react';

type ProductItemProps = {
  image: ReactNode;
  name: ReactNode;
  price: ReactNode;
  quantitySlot: ReactNode;
};

export const ItemLayout = ({
  image,
  name,
  price,
  quantitySlot,
}: ProductItemProps) => {
  return (
    <Container>
      {image}
      <Content>
        {name}
        {price}
        {quantitySlot}
      </Content>
    </Container>
  );
};

// 상품 한 칸의 레이아웃을 구성
const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 0;
  min-width: 0;

  border-top: 1px solid #eeeeee;
`;

ItemLayout.Image = styled.img`
  flex: 0 0 auto;

  width: 98px;
  height: 98px;
  border-radius: 6px;

  object-fit: cover;
  background-color: #f2f2f2;
`;

const Content = styled.div``;

ItemLayout.Name = styled.div`
  overflow: hidden;

  color: #000000;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

ItemLayout.Price = styled.div`
  color: #000000;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.1;

  margin-bottom: 20px;
`;

ItemLayout.Quantity = styled.span`
  overflow: hidden;

  color: #000000;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
