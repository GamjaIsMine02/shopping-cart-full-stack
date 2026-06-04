type ButtonProps = {
  children: string;
  disabled: boolean;
  onClick: () => void;
};

export const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button onClick={() => onClick} disabled={disabled}>
      {children}
    </button>
  );
};
