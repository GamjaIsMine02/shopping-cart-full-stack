import type { ReactNode } from 'react';

type HeaderProps = {
  title?: string;
  left?: ReactNode;
};

export const Header = ({ title, left }: HeaderProps) => {
  return (
    <div>
      {left}
      {title && <div>{title}</div>}
    </div>
  );
};
