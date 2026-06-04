type CartErrorViewProps = {
  error: Error | null;
  onRetry: () => void;
};

export const CartErrorView = ({ error, onRetry }: CartErrorViewProps) => {
  return (
    <div role="alert">
      <p>장바구니 상품을 불러오지 못했습니다.</p>
      {error && <p>{error.message}</p>}
      <button type="button" onClick={onRetry}>
        다시 시도
      </button>
    </div>
  );
};
