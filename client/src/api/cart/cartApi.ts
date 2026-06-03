import type {
  UpdateCartItemQuantityResponse,
  CartItemResponse,
  UpdateCartItemQuantityRequest,
} from './cartApi.types';

// 장바구니 페이지의 API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 1. 장바구니 상품 목록 조회
export const getCartItemsApi = async (): Promise<CartItemResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/cart/items`);

  if (!response.ok) {
    throw new Error('장바구니 조회 실패');
  }

  return response.json();
};

// 2. 장바구니 상품 삭제
export const deleteCartItemApi = async (
  deletingCartItemId: string,
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/cart/items/${deletingCartItemId}`,
    { method: 'DELETE' },
  );

  if (!response.ok) {
    throw new Error('장바구니 상품 삭제 실패');
  }
};

// 3. 장바구니 상품 수량 변경
export const patchCartItemQuantityApi = async (
  cartItemId: string,
  request: UpdateCartItemQuantityRequest,
): Promise<UpdateCartItemQuantityResponse> => {
  const response = await fetch(`${API_BASE_URL}/cart/items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('장바구니 상품 수량 변경 실패');
  }

  return response.json();
};
