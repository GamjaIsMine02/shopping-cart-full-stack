import styled, { keyframes } from 'styled-components';

export const CartSkeleton = () => {
  return (
    <SkeletonSection aria-label="장바구니 상품 목록 로딩 중">
      <HeaderBlock>
        <SkeletonBox width="88px" height="29px" />
      </HeaderBlock>

      <ListBlock>
        <SkeletonItem />
        <SkeletonItem />
      </ListBlock>

      <SummaryBlock>
        <SummaryLine>
          <SkeletonBox width="64px" height="18px" />
          <SkeletonBox width="96px" height="26px" />
        </SummaryLine>
        <SummaryLine>
          <SkeletonBox width="44px" height="18px" />
          <SkeletonBox width="56px" height="26px" />
        </SummaryLine>
        <Divider />
        <SummaryLine>
          <SkeletonBox width="78px" height="18px" />
          <SkeletonBox width="108px" height="26px" />
        </SummaryLine>
      </SummaryBlock>
    </SkeletonSection>
  );
};

const SkeletonItem = () => {
  return (
    <ItemBlock>
      <SkeletonBox width="98px" height="98px" radius="6px" />
      <ItemInfo>
        <SkeletonBox width="66px" height="14px" />
        <SkeletonBox width="106px" height="28px" />
      </ItemInfo>
    </ItemBlock>
  );
};

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
`;

const SkeletonSection = styled.section`
  display: flex;
  flex-direction: column;

  padding: 24px 20px 16px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
`;

const ListBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemBlock = styled.article`
  display: flex;
  gap: 16px;

  padding: 16px 0;
  border-top: 1px solid #eeeeee;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const SummaryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 8px;
`;

const SummaryLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
`;

const SkeletonBox = styled.div<{
  width: string;
  height: string;
  radius?: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius ?? '999px'};

  background-image: linear-gradient(
    90deg,
    #eeeeee 0%,
    #f7f7f7 50%,
    #eeeeee 100%
  );
  background-size: 200% 100%;

  animation: ${shimmer} 1.2s ease-in-out infinite;
`;
