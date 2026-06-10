import styled from 'styled-components';

export const CartEmptyView = () => {
  return (
    <EmptyContainer>
      <Title>장바구니</Title>
      <Message>장바구니에 담은 상품이 없습니다.</Message>
    </EmptyContainer>
  );
};

const EmptyContainer = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 430px;
`;

const Title = styled.h1`
  margin: 0;

  color: #000000;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
`;

const Message = styled.p`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  margin: 0;

  color: #000000;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;
