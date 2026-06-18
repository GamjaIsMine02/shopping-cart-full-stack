import { ApiError, NetworkError } from '../errors/ApiError';
import type {
  GetDiscountPriceRequest,
  OrderResponse,
  PatchOrderResponse,
  PostOrderRequest,
  PostOrderResponse,
} from './orderApi.types';

// 장바구니 페이지의 API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createApiUrl = (path: string) => {
  if (!API_BASE_URL) {
    throw new NetworkError();
  }

  return `${API_BASE_URL}${path}`;
};

// 요청 헬퍼
const request = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw await createApiError(response);
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new NetworkError();
  }
};

type ErrorResponseBody = {
  code?: string;
  message?: string;
};

const createApiError = async (response: Response) => {
  const fallbackMessage = '요청 처리 중 오류가 발생했습니다.';

  try {
    const errorBody = (await response.json()) as ErrorResponseBody;

    return new ApiError({
      status: response.status,
      code: errorBody.code,
      message: errorBody.message ?? fallbackMessage,
    });
  } catch {
    return new ApiError({
      status: response.status,
      message: fallbackMessage,
    });
  }
};

// 1. 주문 정보 조회
export const getOrder = async (orderId: string): Promise<OrderResponse> => {
  const response = await request(createApiUrl(`/orders/${orderId}`));

  return response.json();
};

// 2. 주문 정보 등록
export const postOrder = async (
  requestBody: PostOrderRequest,
): Promise<PostOrderResponse> => {
  const response = await request(createApiUrl(`/orders`), {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });

  return response.json();
};

// 3. 주문 정보 수정 - 쿠폰ID
export const patchOrderCoupons = async (
  orderId: string,
  requestBody: PostOrderRequest,
): Promise<PatchOrderResponse> => {
  const response = await request(createApiUrl(`/orders/${orderId}/coupons`), {
    method: 'PATCH',
    body: JSON.stringify(requestBody),
  });

  return response.json();
};

// 4. 주문 정보 수정 - 도서산간
export const patchOrderIsIsland = async (
  orderId: string,
  requestBody: PostOrderRequest,
): Promise<PatchOrderResponse> => {
  const response = await request(
    createApiUrl(`/orders/${orderId}/delivery-area`),
    {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
    },
  );

  return response.json();
};

// 5. 할인 금액 조회
export const getDiscountPrice = async (
  orderId: string,
  requestBody: GetDiscountPriceRequest,
) => {
  const response = await request(
    createApiUrl(`/orders/${orderId}/discount-price`),
    {
      method: 'POST',
      body: JSON.stringify(requestBody),
    },
  );

  return response.json();
};
