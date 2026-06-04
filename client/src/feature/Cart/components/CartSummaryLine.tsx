export const CartSummaryLine = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  return (
    <div>
      <div>{title}</div>
      <div>{value}</div>
    </div>
  );
};
