import { ApiError, NetworkError } from '../errors/ApiError';
import type {
  UpdateCartItemQuantityResponse,
  CartItemResponse,
  UpdateCartItemQuantityRequest,
} from './cartApi.types';

// 장바구니 페이지의 API
const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL ?? globalThis.location?.origin ?? '';

// 1. 장바구니 상품 목록 조회
export const getCartItemsApi = async (): Promise<CartItemResponse[]> => {
  const response = await request(`${API_BASE_URL}/cart/items`);

  return response.json();
};

// 2. 장바구니 상품 삭제
export const deleteCartItemApi = async (
  deletingCartItemId: string,
): Promise<void> => {
  await request(`${API_BASE_URL}/cart/items/${deletingCartItemId}`, {
    method: 'DELETE',
  });
};

// 3. 장바구니 상품 수량 변경
export const patchCartItemQuantityApi = async (
  cartItemId: string,
  requestBody: UpdateCartItemQuantityRequest,
): Promise<UpdateCartItemQuantityResponse> => {
  const response = await request(`${API_BASE_URL}/cart/items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  return response.json();
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
