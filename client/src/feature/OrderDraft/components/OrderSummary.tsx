import styled from 'styled-components';
import type { PriceContextType } from './OrderSuccessView';
import { PriceSummaryLine } from '../../../shared/components/PriceSummaryLine';

export const OrderSummary = ({
  priceContext,
}: {
  priceContext: PriceContextType;
}) => {
  return (
    <>
      <SummarySection>
        <DeliveryNotice>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </DeliveryNotice>
        <SummaryBox>
          <PriceSummaryLine title="주문 금액" value={priceContext.orderPrice} />
          <PriceSummaryLine
            title="쿠폰 할인 금액"
            value={-priceContext.productDiscountPrice}
          />
          <PriceSummaryLine title="배송비" value={priceContext.deliveryFee} />
          <Divider />
          <PriceSummaryLine
            title="총 결제 금액"
            value={priceContext.totalPrice}
          />
        </SummaryBox>
      </SummarySection>
    </>
  );
};

const SummarySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
`;

const DeliveryNotice = styled.p`
  margin: 0;

  color: #000000;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.4;

  &::before {
    content: 'ⓘ';
    margin-right: 4px;
  }
`;

const SummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: 0;
  border: 0;

  background-color: #eeeeee;
`;
