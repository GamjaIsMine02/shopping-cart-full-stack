import { useState } from 'react';
import type {
  OrderResponse,
  PatchOrderRequest,
  PatchOrderResponse,
} from '../../../api/orderDraft/orderApi.types';
import { getOrder, patchOrderIsIsland } from '../../../api/orderDraft/orderApi';
import { useQuery } from '../../../shared/hooks/useQuery';
import { useMutation } from '../../../shared/hooks/useMutation';

export type PriceInfo = {
  orderPrice: number;
  productDiscountPrice: number;
  deliveryDiscountPrice: number;
  deliveryFee: number;
  totalPrice: number;
};

export const useOrder = (orderId?: string) => {
  const { data, isLoading, error, refetch, setQueryData } =
    useQuery<OrderResponse>(`order-${orderId ?? 'idle'}`, getOrder, orderId);

  const { mutate, error: patchOrderIsIslandError } = useMutation<
    Pick<PatchOrderRequest, 'isIsland'>,
    PatchOrderResponse
  >(({ isIsland }) => patchOrderIsIsland(orderId, { isIsland }));

  const [orderActionError, setOrderActionError] = useState<Error | null>(null);

  // 주문 조회
  const loadOrder = async () => refetch();

  // 주문 수정 - 도서산간
  const changeOrderIsIsland = async (isIsland: boolean) => {
    const previousOrder = data;

    const response = await mutate(
      {
        isIsland,
      },
      {
        onMutate: () => {
          setOrderActionError(null);
          setQueryData((previousOrder) => {
            if (previousOrder.isIsland === isIsland) return previousOrder;

            return {
              ...previousOrder,
              isIsland: isIsland,
            };
          });
        },

        onError: () => {
          setQueryData(() => previousOrder);
          setOrderActionError(patchOrderIsIslandError);
        },
      },
    );

    if (!response) return false;

    setQueryData((order) => ({
      ...order,
      isIsland,
      priceInfo: response.priceInfo,
    }));
  };

  return {
    data,
    isLoading,
    error,
    loadOrder,
    changeOrderIsIsland,
    orderActionError,
  };
};
