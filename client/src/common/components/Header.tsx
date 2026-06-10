import type { ReactNode } from 'react';
import styled from 'styled-components';

type HeaderProps = {
  title?: string;
  left?: ReactNode;
};

export const Header = ({ title, left }: HeaderProps) => {
  return (
    <HeaderContainer>
      {left}
      {title && <Title>{title}</Title>}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 56px;
  padding: 0 20px;

  background-color: #000000;
  color: #ffffff;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    height: 36px;
    padding: 0;
    border: 0;

    background: transparent;
    color: inherit;
    font-size: 32px;
    line-height: 1;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
`;
