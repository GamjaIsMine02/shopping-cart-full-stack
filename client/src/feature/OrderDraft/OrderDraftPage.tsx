import { Navigate, useLocation } from 'react-router-dom';
import { useOrder } from './hooks/useOrder';

export const OrderDraftPage = () => {
  const location = useLocation();
  const { orderId } = location.state as { orderId: string };

  const { data, isLoading, error } = useOrder(orderId);

  console.log(data);

  if (!orderId) {
    return <Navigate to="/cart" replace />;
  }

  if (isLoading) return <div>주문 정보를 불러오는 중입니다.</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return <div>draft</div>;
};
