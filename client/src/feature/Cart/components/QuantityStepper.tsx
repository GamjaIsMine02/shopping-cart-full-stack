import styled from 'styled-components';

type QuantityStepperProps = {
  quantity: number;
  isDecreaseDisabled: boolean;
  isIncreaseDisabled: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const QuantityStepper = ({
  quantity,
  isDecreaseDisabled,
  isIncreaseDisabled,
  onDecrease,
  onIncrease,
}: QuantityStepperProps) => {
  return (
    <StepperContainer>
      <StepperButton
        type="button"
        disabled={isDecreaseDisabled}
        onClick={onDecrease}
      >
        -
      </StepperButton>
      <Quantity>{quantity}</Quantity>
      <StepperButton
        type="button"
        disabled={isIncreaseDisabled}
        onClick={onIncrease}
      >
        +
      </StepperButton>
    </StepperContainer>
  );
};

const StepperContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 24px 24px 24px;
  align-items: center;
  width: fit-content;
`;

const StepperButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid #dddddd;
  border-radius: 50%;

  background-color: #ffffff;
  color: #000000;

  font-size: 18px;
  line-height: 1;

  &:disabled {
    color: #bdbdbd;
    background-color: #ffffff;
  }
`;

const Quantity = styled.span`
  color: #000000;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
`;
