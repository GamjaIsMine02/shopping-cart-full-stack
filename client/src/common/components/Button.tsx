import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export const Button = ({
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <ButtonContainer type={type} {...props}>
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 56px;
  border: 0;

  background-color: #000000;
  color: #ffffff;

  font-size: 15px;
  font-weight: 700;

  &:disabled {
    background-color: #c7c7c7;
    color: #ffffff;
  }
`;
