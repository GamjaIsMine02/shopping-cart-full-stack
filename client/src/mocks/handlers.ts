import { http, HttpResponse } from 'msw';
import type {
  CartItemResponse,
  UpdateCartItemQuantityRequest,
} from '../api/cart/cartApi.types';

export const initialCartItems: CartItemResponse[] = [
  {
    cartItemId: 'cart-item-1',
    productId: 'product-1',
    productName: '구글',
    productPrice: 10000,
    imageUrl: '/images/google.png',
    purchaseQuantity: 1,
    remainingQuantity: 10,
  },
  {
    cartItemId: 'cart-item-2',
    productId: 'product-2',
    productName: '마이크로소프트',
    productPrice: 20000,
    imageUrl: '/images/microsoft.png',
    purchaseQuantity: 4,
    remainingQuantity: 10,
  },
  {
    cartItemId: 'cart-item-3',
    productId: 'product-3',
    productName: '우아한 형제들',
    productPrice: 100000,
    imageUrl: '/images/woowa.png',
    purchaseQuantity: 3,
    remainingQuantity: 10,
  },
];

let mockCartItems = [...initialCartItems];

export const resetMockCartItems = () => {
  mockCartItems = [...initialCartItems];
};

export const setMockCartItems = (cartItems: CartItemResponse[]) => {
  mockCartItems = [...cartItems];
};

export const handlers = [
  http.get('http://localhost/cart/items', () => {
    return HttpResponse.json(mockCartItems);
  }),

  http.delete('http://localhost/cart/items/:cartItemId', ({ params }) => {
    const { cartItemId } = params;

    mockCartItems = mockCartItems.filter(
      (cartItem) => cartItem.cartItemId !== cartItemId,
    );

    return new HttpResponse(null, { status: 204 });
  }),

  http.patch('http://localhost/cart/items/:cartItemId', async ({ params, request }) => {
    const { cartItemId } = params;
    const requestBody = (await request.json()) as UpdateCartItemQuantityRequest;

    mockCartItems = mockCartItems.map((cartItem) => {
      if (cartItem.cartItemId !== cartItemId) return cartItem;

      return {
        ...cartItem,
        purchaseQuantity: requestBody.purchaseQuantity,
      };
    });

    return HttpResponse.json({
      cartItemId,
      purchaseQuantity: requestBody.purchaseQuantity,
    });
  }),
];
