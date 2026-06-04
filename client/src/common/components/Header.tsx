type HeaderProps = {
  title?: string;
  left?: React.ReactNode;
};

export const Header = ({ title, left }: HeaderProps) => {
  return (
    <div>
      {left}
      {title && <div>{title}</div>}
    </div>
  );
};
